// creating a basic http server in node js
const http = require('http');

const port = 1245;
const host = 'localhost';

const app = http.createServer((req, res) => {
  const textResponse = 'Hello Holberton School!';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', textResponse.length);
  res.statusCode = 200;
  res.end(textResponse);
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});

module.exports = app;
