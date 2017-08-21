const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const routes = require('./routes');

const root = './';
const port = process.env.Port || 4200;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(root, 'dist')));
// app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile('dist/index.html', { root });
});
app.listen(port, () => console.log(`API running on localhost:${port}`));
