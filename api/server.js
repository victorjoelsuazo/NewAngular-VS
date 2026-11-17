const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const destinos = [];

app.get('/api/destinos', (req, res) => {
  res.json(destinos);
});

app.post('/api/destinos', (req, res) => {
  destinos.push(req.body);
  res.json(req.body);
});

app.listen(3000, () => console.log('API en http://localhost:3000'));