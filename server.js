const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/stocks/:stockId', express.static(path.join(__dirname, 'public')));

const axios5000 = axios.create({
  baseURL: 'http://127.0.0.1:5000',
});

// const axios3002 = axios.create({
//   baseURL: 'http://localhost:3002',
// });

// const axios3003 = axios.create({
//   baseURL: 'http://localhost:3003',
// });

// const axios4000 = axios.create({
//   baseURL: 'http://localhost:4000',
// });

app.use('/api/stocks/:stockId', (req, res) => {
  const parameter = (req.params.stockId) ? req.params.stockId : 'AITHK'
  axios5000.get(`/api/stocks/${parameter}`)
    .then(response => res.send(response.data))
    .catch(err => res.send(err));
})

// app.use('/api/history/:ticker', (req, res) => {
//   axios3001.get(`/api/history/${req.params.ticker}`)
//     .then(response => res.send(response.data))
//     .catch(err => res.send(err));
// })

// app.use('/api/stocks/:ticker', (req, res) => {
//   axios3002.get(`/api/stocks/${req.params.ticker}`)
//     .then(response => res.send(response.data))
//     .catch(err => res.send(err));
// })

app.use('/api/accounts/:account_number', (req, res) => {
  axios5000.get(`/api/accounts/${req.params.account_number}`)
    .then(response => res.send(response.data))
    .catch(err => res.send(err));
})

// app.use('/api/quotes/:symbol', (req, res) => {
//   axios3003.get(`/api/quotes/${req.params.symbol}`)
//     .then(response => res.send(response.data))
//     .catch(err => res.send(err));
// })

// app.use('/stocks/tags/:tag', (req, res) => {
//   axios3003.get(`/stocks/tags/${req.params.tag}`)
//     .then(response => res.send(response.data))
//     .catch(err => res.send(err));
// })
// app.use('/api/:stockId', (req, res) => {
//   axios4000.get(`/api/${req.params.stockId}`)
//     .then(response => res.send(response.data))
//     .catch(err => res.send(err));
// })

app.listen(port, () => {
  console.log(`proxy server running at: http://localhost:${port}`);
});
