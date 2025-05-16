import React, { useState } from 'react';

export default function Login({ onCredencialesGuardadas }) {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientId || !clientSecret) {
      alert('Por favor, ingresa CLIENT_ID y CLIENT_SECRET');
      return;
    }
    localStorage.setItem('CLIENT_ID', clientId);
    localStorage.setItem('CLIENT_SECRET', clientSecret);
    alert('Credenciales guardadas correctamente');
    if (onCredencialesGuardadas) {
      onCredencialesGuardadas();
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Login - Configurar Credenciales Spotify</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>CLIENT_ID:</label>
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            style={{ width: '100%', marginBottom: '1rem' }}
          />
        </div>
        <div>
          <label>CLIENT_SECRET:</label>
          <input
            type="password"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
            style={{ width: '100%', marginBottom: '1rem' }}
          />
        </div>
        <button type="submit">Guardar Credenciales</button>
      </form>
    </div>
  );
}
