const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Главная' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'О нас' });
});

app.get('/cats', async (req, res) => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=5');
    res.render('cats', { title: 'Котики', cats: response.data });
  } catch (error) {
    res.status(500).send('Ошибка при получении данных');
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
