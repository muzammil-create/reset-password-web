import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { account } from '../appwriteConfig';

function ResetPassword() {
  // Get token from URL
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const userId = query.get('userId');
const secret = query.get('secret');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (!password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!userId || !secret) {
      setError('Invalid or expired reset link.');
      return;
    }
    setLoading(true);
    try {
      await account.updateRecovery(userId, secret, password, confirmPassword);
      setMessage('Your password has been reset. You can now log in.');
    } catch (err) {
      setError(err?.message || 'Reset failed.');
    } finally {
      setLoading(false);
    }
  };


  // Optionally, handle invalid token UI here (not required if backend returns error)

  return (
    <div style={{ maxWidth: 400, margin: '60px auto', padding: 24, border: '1px solid #eee', borderRadius: 8, boxShadow: '0 2px 8px #f0f0f0' }}>
      <h2 style={{ textAlign: 'center' }}>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            minLength={6}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            minLength={6}
            required
          />
        </div>
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10, background: '#007bff', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold' }}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      {message && <div style={{ color: 'green', marginTop: 16 }}>{message}</div>}
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
    </div>
  );
}

export default ResetPassword;
