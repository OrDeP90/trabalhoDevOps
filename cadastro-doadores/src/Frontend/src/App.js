import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState('');
  const [showDonors, setShowDonors] = useState(false);
  const [donors, setDonors] = useState([]);

  // Configuração dinâmica da URL base
  const API_BASE = window.location.hostname === 'k8s.local' ? '' : '/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`${API_BASE}/doadores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: name,
          tipo_sanguineo: bloodType,
          data_nascimento: dob,
          email: email,
          consentimento: consent,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Erro ao cadastrar');
      
      setMessage(data.message);
      setName('');
      setBloodType('');
      setDob('');
      setEmail('');
      setConsent(false);
      await fetchDonors();
      
    } catch (err) {
      setMessage(err.message || 'Erro na conexão');
      console.error('Erro:', err);
    }
  };

  const fetchDonors = async () => {
    try {
      const res = await fetch(`${API_BASE}/doadores`);
      if (!res.ok) throw new Error('Falha ao carregar');
      const data = await res.json();
      setDonors(data);
      setShowDonors(true);
    } catch (err) {
      setMessage(err.message);
      console.error('Erro:', err);
    }
  };

  return (
    <div className="container">
      <h1>Cadastro de Doadores</h1>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input value={name} onChange={e => setName(e.target.value)} required />

        <label>Tipo Sanguíneo:</label>
        <select value={bloodType} onChange={e => setBloodType(e.target.value)} required>
          <option value="">Selecione</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <label>Data de Nascimento:</label>
        <input type="date" value={dob} onChange={e => setDob(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

        <label>
          <input
            type="checkbox"
            checked={consent}
            onChange={e => setConsent(e.target.checked)}
          />{' '}
          Concordo em ter meu nome divulgado como doador
        </label>

        <button type="submit">Cadastrar</button>
      </form>

      {message && <p className="message">{message}</p>}

      <button
        style={{
          marginTop: '20px',
          backgroundColor: '#0066cc',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '10px',
          cursor: 'pointer',
        }}
        onClick={() => (showDonors ? setShowDonors(false) : fetchDonors())}
      >
        {showDonors ? 'Esconder Doadores Consentidos' : 'Mostrar Doadores Consentidos'}
      </button>

      {showDonors && (
        <ul style={{ marginTop: '15px', maxHeight: '200px', overflowY: 'auto', padding: 0 }}>
          {donors.length === 0 && <li>Nenhum doador consentido encontrado.</li>}
          {donors.map((d) => (
            <li key={d.id} style={{ listStyle: 'none', padding: '5px 0', borderBottom: '1px solid #ccc' }}>
              {d.nome} — {d.tipo_sanguineo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
