const express = require('express');

const app = express();
const port = 8080;

app.get('/', (_, res) => res.send('test endpoint...'));

app.listen(port, () => {
  console.log(`API running on port ${port}...`);
});
