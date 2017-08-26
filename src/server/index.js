const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const routes = require('./routes');

const root = './public';
const public = process.env.PUBLIC || `${root}`;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(root, 'dist')));
app.use(express.static(public));
console.log(`serving ${public}`);
// app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile(`${public}/index.html`, { root: root });
});

const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`API running on localhost:${port}`));
