import React, { useEffect, useState } from 'react';

interface InvestmentProduct {
  id: string;
  name: string;
  description: string;
  rate: number;
}

interface Transaction {
  id: string;
  user_id: string;
  investment_product_id: string | null;
  amount: number;
  type: string;
  created_at: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  balance: number;
  role?: string;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<InvestmentProduct[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [creditAmount, setCreditAmount] = useState(0);
  const [debitAmount, setDebitAmount] = useState(0);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('/api/auth/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch user'))
      .then(setUser)
      .catch(() => setUser(null));
    Promise.all([
      fetch('/api/investments', { headers: { Authorization: `Bearer ${token}` } }),
      fetch('/api/transactions', { headers: { Authorization: `Bearer ${token}` } })
    ])
      .then(async ([prodRes, txRes]) => {
        if (!prodRes.ok || !txRes.ok) throw new Error('Failed to fetch data');
        const products = await prodRes.json();
        const transactions = await txRes.json();
        setProducts(products);
        setTransactions(transactions);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Fetch admin data if admin
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role === 'admin') {
        setAdminLoading(true);
        Promise.all([
          fetch('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('/api/admin/transactions', { headers: { Authorization: `Bearer ${token}` } })
        ])
          .then(async ([userRes, txRes]) => {
            if (!userRes.ok || !txRes.ok) throw new Error('Failed to fetch admin data');
            setUsers(await userRes.json());
            setTransactions(await txRes.json());
          })
          .catch(err => setAdminError(err.message))
          .finally(() => setAdminLoading(false));
      }
    } catch {
      // ignore invalid token
    }
  }, []);

  // Admin wallet actions
  const handleCredit = async () => {
    if (!selectedUser || creditAmount <= 0) return;
    const token = localStorage.getItem('token');
    setAdminLoading(true);
    try {
      const res = await fetch('/api/admin/wallet/credit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId: selectedUser.id, amount: creditAmount })
      });
      if (!res.ok) throw new Error('Failed to credit wallet');
      alert('Wallet credited!');
    } catch (e: any) {
      alert(e.message);
    } finally {
      setAdminLoading(false);
    }
  };

  const handleDebit = async () => {
    if (!selectedUser || debitAmount <= 0) return;
    const token = localStorage.getItem('token');
    setAdminLoading(true);
    try {
      const res = await fetch('/api/admin/wallet/debit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId: selectedUser.id, amount: debitAmount })
      });
      if (!res.ok) throw new Error('Failed to debit wallet');
      alert('Wallet debited!');
    } catch (e: any) {
      alert(e.message);
    } finally {
      setAdminLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;
  if (!user) return <div className="p-8 text-center text-red-600">User not found or not authenticated.</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
      <div className="mb-4 text-lg">Wallet Balance: <span className="font-mono text-green-600">${user.balance?.toFixed(2) ?? '0.00'}</span></div>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Investment Products</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map(p => (
            <li key={p.id} className="bg-white p-4 rounded shadow">
              <h3 className="font-bold text-lg">{p.name}</h3>
              <p>{p.description}</p>
              <p className="text-blue-700 font-semibold">Rate: {p.rate}%</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Your Transactions</h2>
        <ul className="divide-y">
          {transactions
            .filter(tx => tx.user_id === user.id)
            .map(tx => (
              <li key={tx.id} className="py-2">
                <span className="font-medium">{tx.type}</span> - ${tx.amount} on {new Date(tx.created_at).toLocaleDateString()}
              </li>
            ))}
        </ul>
      </section>
      {/* Admin dashboard UI */}
      {user.role === 'admin' && (
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Admin Controls</h2>
          {adminError && <div className="text-red-600 mb-2">{adminError}</div>}
          <div className="mb-4">
            <label className="block mb-1">Select User:</label>
            <select
              className="border rounded px-2 py-1"
              value={selectedUser?.id || ''}
              onChange={e => setSelectedUser(users.find(u => u.id === e.target.value) || null)}
            >
              <option value="">-- Select User --</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
              ))}
            </select>
          </div>
          <div className="flex gap-4 mb-4">
            <div>
              <label>Credit Amount ($):</label>
              <input type="number" className="ml-2 border rounded px-2 py-1" value={creditAmount} onChange={e => setCreditAmount(Number(e.target.value))} />
              <button className="ml-2 bg-green-600 text-white px-3 py-1 rounded" onClick={handleCredit} disabled={adminLoading}>Credit</button>
            </div>
            <div>
              <label>Debit Amount ($):</label>
              <input type="number" className="ml-2 border rounded px-2 py-1" value={debitAmount} onChange={e => setDebitAmount(Number(e.target.value))} />
              <button className="ml-2 bg-red-600 text-white px-3 py-1 rounded" onClick={handleDebit} disabled={adminLoading}>Debit</button>
            </div>
          </div>
          <h3 className="text-xl font-semibold mt-6 mb-2">All Users</h3>
          <table className="w-full border text-sm mb-6">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Balance</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-t">
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{u.role}</td>
                  <td className="p-2">${u.balance?.toFixed(2) ?? '0.00'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="text-xl font-semibold mb-2">All Transactions</h3>
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="p-2">User ID</th>
                <th className="p-2">Product ID</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Type</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{t.user_id}</td>
                  <td className="p-2">{t.investment_product_id ?? '-'}</td>
                  <td className="p-2">${t.amount}</td>
                  <td className="p-2">{t.type}</td>
                  <td className="p-2">{new Date(t.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
};

export default Dashboard;