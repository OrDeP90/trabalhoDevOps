const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cria um router com prefixo /api
const apiRouter = express.Router();

apiRouter.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    dbConnection: 'ok'
  });
});

apiRouter.get('/doadores', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM doadores WHERE consentimento = true');
    res.json(rows);
  } catch (error) {
    console.error('Erro no GET /doadores:', error);
    res.status(500).json({ error: 'Erro ao buscar doadores' });
  }
});

apiRouter.post('/doadores', async (req, res) => {
  const { nome, tipo_sanguineo, data_nascimento, email, consentimento } = req.body;
  
  if (!nome || !tipo_sanguineo || !data_nascimento || !email) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO doadores (nome, tipo_sanguineo, data_nascimento, email, consentimento) 
       VALUES (?, ?, ?, ?, ?)`,
      [nome, tipo_sanguineo, data_nascimento, email, Boolean(consentimento)]
    );
    
    res.status(201).json({ 
      message: 'Doador cadastrado',
      id: result.insertId 
    });
  } catch (error) {
    console.error('Erro no POST /doadores:', error);
    res.status(500).json({ error: 'Erro ao cadastrar doador' });
  }
});

// Aplica o router com prefixo /api
app.use('/api', apiRouter);

app.listen(5000, () => console.log('Backend rodando na porta 5000'));