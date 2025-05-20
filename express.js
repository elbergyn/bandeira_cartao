const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

function identificarBandeira(numero) {
  const num = numero.replace(/\D/g, '');

  // Visa: Começa com 4
  if (/^4/.test(num)) return 'Visa';

  // MasterCard: 51-55 ou 2221-2720
  if (/^5[1-5]/.test(num)) return 'MasterCard';
  if (/^2(2[2-9][1-9]?|2[3-9]|[3-6]|7[01]|720)/.test(num)) return 'MasterCard';
  if (/^55/.test(num)) return 'MasterCard'; // Garante que 55 reconhece MasterCard

  // American Express: 34 ou 37
  if (/^3[47]/.test(num)) return 'amex';

  // Discover: 6011, 65, 644-649
  if (/^6011/.test(num) || /^65/.test(num) || /^64[4-9]/.test(num)) return 'Discover';

  // Elo: principais intervalos conhecidos
  if (/^4011/.test(num) || /^4312/.test(num) || /^4389/.test(num) || /^4514/.test(num) || /^4573/.test(num) || /^4576/.test(num) || /^5041/.test(num) || /^5067/.test(num) || /^509/.test(num) || /^6277/.test(num) || /^6362/.test(num) || /^6363/.test(num)) return 'Elo';

  // Hipercard: começa com 6062
  if (/^6062/.test(num)) return 'Hipercard';

  return 'Desconhecida';
}

app.post('/bandeira', (req, res) => {
  const { numero } = req.body;
  if (!numero) return res.status(400).json({ erro: 'Número do cartão é obrigatório.' });
  const bandeira = identificarBandeira(numero);
  res.json({ bandeira });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});