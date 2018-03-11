const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;
a = 0;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  request.pipe(response);
  response.end(a++);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});