import React, { useState } from 'react';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('investor');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      // Store token and user profile, then redirect
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main aria-label="Register Page" className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm" aria-label="Register Form">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        {error && <div className="text-red-600 mb-2" role="alert">{error}</div>}
        {success && <div className="text-green-600 mb-2" role="status">{success}</div>}
        <label htmlFor="name" className="block mb-1 font-medium">Name</label>
        <input id="name" type="text" required className="w-full mb-4 p-2 border rounded" value={name} onChange={e => setName(e.target.value)} aria-required="true" />
        <label htmlFor="email" className="block mb-1 font-medium">Email</label>
        <input id="email" type="email" autoComplete="email" required className="w-full mb-4 p-2 border rounded" value={email} onChange={e => setEmail(e.target.value)} aria-required="true" />
        <label htmlFor="password" className="block mb-1 font-medium">Password</label>
        <input id="password" type="password" autoComplete="new-password" required className="w-full mb-4 p-2 border rounded" value={password} onChange={e => setPassword(e.target.value)} aria-required="true" />
        <label htmlFor="role" className="block mb-1 font-medium">Role</label>
        <select id="role" className="w-full mb-4 p-2 border rounded" value={role} onChange={e => setRole(e.target.value)} aria-required="true">
          <option value="investor">Investor</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
      </form>
    </main>
  );
};

export default RegisterPage;
