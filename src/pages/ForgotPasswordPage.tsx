import React, { useState } from 'react';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      // Placeholder: implement backend endpoint for forgot password
      await new Promise(res => setTimeout(res, 1000));
      setMessage('If this email exists, a reset link has been sent.');
    } catch (err: any) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm" aria-label="Forgot Password Form" noValidate>
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        {error && <div className="text-red-600 mb-2" role="alert">{error}</div>}
        {message && <div className="text-green-600 mb-2" role="status">{message}</div>}
        <label htmlFor="email" className="block mb-1 font-medium">Email</label>
        <input id="email" type="email" autoComplete="email" required className="w-full mb-4 p-2 border rounded" value={email} onChange={e => setEmail(e.target.value)} aria-required="true" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50" disabled={loading}>{loading ? 'Sending...' : 'Send Reset Link'}</button>
      </form>
    </main>
  );
};

export default ForgotPasswordPage;
