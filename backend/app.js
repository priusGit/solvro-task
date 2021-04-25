const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get('/ping', (req, res, next)  => {
  res.status(200).json('pong!');
});

app.post('/movie', (req, res, next)  => {
  if (req.body.movie === '78483421') {
    res.status(201).json({
      status: 'success',
      title: 'Wojownicy Solvro, Więzień KNSI',
      sessions: [1561372200000, 1561379400000, 1561386600000, 1561390200000],
      arrangement: {
        'A': [{'1': 1}, {'2': 0}, {'3': 1}, {'4': 1}, {'5': 1}, {'6': 0}, {'7': 1}],
        'B': [{'1': 1}, {'2': 1}, {'3': 0}, {'4': 1}, {'5': 1}, {'6': 1}, {'7': 1}, {'8': 1}],
        'C': [{'1': 1}, {'2': 0}, {'3': 0}, {'4': 1}, {'5': 0}, {'6': 0}, {'7': 0}, {'8': 1}, {'9': 0}],
        'D': [{'1': 0}, {'2': 0}, {'3': 1}, {'4': 0}, {'5': 1}, {'6': 0}, {'7': 0}, {'8': 1}, {'9': 0}],
        'E': [{'1': 1}, {'2': 1}, {'3': 1}, {'4': 0}, {'5': 0}, {'6': 1}, {'7': 1}, {'8': 1}, {'9': 0}],
        'F': [{'1': 0}, {'2': 0}, {'3': 0}, {'4': 0}, {'5': 1}, {'6': 0}, {'7': 1}, {'8': 0}, {'9': 0}],
        'G': [{'1': 1}, {'2': 1}, {'3': 1}, {'4': 1}, {'5': 1}, {'6': 1}, {'7': 1}, {'8': 1}, {'9': 1}],
      }
    });
  } else {
    res.status(404).json({
      status: 'error'
    });
  }
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: 'error',
    error: err
  });
});

app.listen(5000, () => {
  console.log('App listening on port 5000!');
});
