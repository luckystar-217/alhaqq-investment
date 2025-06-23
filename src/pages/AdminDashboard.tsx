import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface InvestmentProduct {
  id: number;
  name: string;
  description: string;
  rate: number;
}

interface Transaction {
  id: number;
  user_id: number;
  investment_product_id: number;
  amount: number;
  type: string;
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<InvestmentProduct[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    Promise.all([
      fetch('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
      fetch('/api/investments', { headers: { Authorization: `Bearer ${token}` } }),
      fetch('/api/admin/transactions', { headers: { Authorization: `Bearer ${token}` } })
    ])
      .then(async ([userRes, prodRes, txRes]) => {
        if (!userRes.ok || !prodRes.ok || !txRes.ok) throw new Error('Failed to fetch admin data');
        const users = await userRes.json();
        const products = await prodRes.json();
        const transactions = await txRes.json();
        setUsers(users);
        setProducts(products);
        setTransactions(transactions);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <ul className="divide-y">
          {users.map(u => (
            <li key={u.id} className="py-2 flex justify-between">
              <span>{u.name} ({u.email}) - {u.role}</span>
            </li>
          ))}
        </ul>
      </section>
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
        <h2 className="text-xl font-semibold mb-2">All Transactions</h2>
        <ul className="divide-y">
          {transactions.map(tx => (
            <li key={tx.id} className="py-2">
              <span className="font-medium">{tx.type}</span> - {tx.amount} by user {tx.user_id} on {new Date(tx.created_at).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default AdminDashboard;
