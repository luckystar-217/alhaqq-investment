import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);
      // Optionally store user profile in localStorage for quick access
      localStorage.setItem('user', JSON.stringify(data.user));
      // Redirect based on role
      const payload = JSON.parse(atob(data.token.split('.')[1]));
      if (payload.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main aria-label="Login Page" className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm" aria-label="Login Form" noValidate>
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <div className="text-red-600 mb-2" role="alert" id="login-error">{error}</div>}
        <label htmlFor="email" className="block mb-1 font-medium">Email</label>
        <input id="email" type="email" autoComplete="email" required className="w-full mb-4 p-2 border rounded" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} aria-required="true" aria-invalid={!!error} aria-describedby={error ? 'login-error' : undefined} />
        <label htmlFor="password" className="block mb-1 font-medium">Password</label>
        <div className="relative mb-4">
          <input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required className="w-full p-2 border rounded pr-10" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} aria-required="true" aria-invalid={!!error} aria-describedby={error ? 'login-error' : undefined} />
          <button type="button" className="absolute right-2 top-2 text-sm text-gray-500" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        <div className="flex justify-between mt-4 text-sm">
          <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
          <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</Link>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
