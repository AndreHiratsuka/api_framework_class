// =============================================================
// Module 1 · Class 1: What is a framework and why use Express
// (O que é um framework e por que usar o Express)
// =============================================================
//
// GOAL
// Before touching Express, build a tiny server using ONLY Node's built-in
// `http` module (módulo nativo http). Feeling how repetitive this is shows you
// why frameworks exist. In the next classes you'll rewrite it with Express.
//
// Your server must answer:
//   GET /          -> 200, Content-Type text/plain,  body: Olá, mundo!
//   GET /status    -> 200, Content-Type for JSON,    body: {"status":"ok"}
//   anything else  -> 404, Content-Type text/plain,  body: Rota não encontrada
//
// RUN (from the project root):  node class_js/module_1/class_1/server.js
// STOP:                         Ctrl+C
// No npm install needed: `http` ships with Node, like Python's http.server.
// =============================================================


// -------------------------------------------------------------
// STEP 1: Import the http module
// -------------------------------------------------------------
// In CommonJS, require() RETURNS the module, and you store it in a variable:
//
//   Python:  import os
//   JS:      const os = require('os');
//
// `const` declares a name you won't reassign later.
// Lines end with `;` in JS (optional, but the book uses it, so do the same).
//
// TODO: import 'http' into a const named http
const http = require('http');


// -------------------------------------------------------------
// STEP 2: Create the server with a request handler
// -------------------------------------------------------------
// http.createServer() receives a FUNCTION. Node calls that function once
// for EVERY request (requisição) that arrives, passing it two objects:
//   req -> the request: req.method ('GET', 'POST'...), req.url ('/status'...)
//   res -> the response you build and send back
//
// Arrow function (função de seta) is a compact way to write a function,
// like a lambda that can hold many lines:
//
//   Python:  def handler(req, res):
//                ...
//   JS:      (req, res) => {
//                ...
//            }
//
// Shape of what you'll write (steps 3, 4 and 5 go INSIDE the { }):
//
//   const server = http.createServer((req, res) => {
//     // step 3
//     // step 4
//     // step 5
//   });
//
// TODO: create the server
const server = http.createServer((req, res) => {

  // -------------------------------------------------------------
  // STEP 3: Route GET /   (inside the handler)
  // -------------------------------------------------------------
  // You check the method AND the path by hand. This manual check is the
  // "routing" (roteamento) that Express will do for you later.
  //
  // JS syntax:
  //   if (condition) { ... }   parentheses + braces, no colon
  //   &&                       Python's `and`
  //   ===                      equality; always use === (not ==) in JS
  //   'text'                   strings, same as Python
  //
  // To answer, two calls on res:
  //   res.writeHead(statusCode, { 'Header-Name': 'value' });  // status line + headers
  //   res.end('body');                                         // sends body, finishes
  //
  // Then `return;`, so the code below doesn't ALSO run and try to answer
  // the same request a second time (Node would throw an error).
  //
  // TODO: if GET and url is '/', answer 200 + text/plain + Olá, mundo!
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Olá, mundo!');
    return;
  }

  // -------------------------------------------------------------
  // STEP 4: Route GET /status, answering JSON   (inside the handler)
  // -------------------------------------------------------------
  // res.end() only accepts text, not a JS object, so you must SERIALIZE
  // (serializar) the object yourself (Protocolos da Web, módulo 6):
  //
  //   Python:  json.dumps({"status": "ok"})
  //   JS:      JSON.stringify({ status: 'ok' })   // JSON is built in, no require
  //
  // Notice: JS object keys don't need quotes ({ status: 'ok' }).
  //
  // The Content-Type must tell the client this body is JSON. Which value is it?
  // (Protocolos da Web, módulo 5: Content-Type e Accept)
  //
  // TODO: if GET /status, answer 200 + JSON Content-Type + the serialized object
  if (req.method === 'GET' && req.url === '/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  // -------------------------------------------------------------
  // STEP 5: Fallback 404   (inside the handler, after the ifs)
  // -------------------------------------------------------------
  // If you got here, no `if` matched, so the route doesn't exist.
  // (Protocolos da Web, módulo 4: 4xx, o erro é do cliente)
  //
  // TODO: answer 404 + text/plain + Rota não encontrada
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Rota não encontrada');
});


// -------------------------------------------------------------
// STEP 6: Start listening   (OUTSIDE the handler, after createServer)
// -------------------------------------------------------------
// server.listen(port, callback)
// The callback (função de retorno) runs ONCE, when the server is ready.
// It's a function with no parameters:  () => { ... }
// console.log('...') is JS's print('...').
//
// TODO: listen on port 3000 and log: Servidor rodando na porta 3000
server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});


// =============================================================
// TEST (in a SECOND terminal, while the server is running)
// =============================================================
//   curl -i http://localhost:3000/
//   curl -i http://localhost:3000/status
//   curl -i http://localhost:3000/nao-existe
//   curl -i -X POST http://localhost:3000/
//
// -i prints the status line and headers, not just the body.
// Check that each response has the status code and Content-Type you expect.
//
// REFLECT (answer in NOTES.md):
//   1. The POST to / got a 404. Is 404 the most accurate status for
//      "this path exists, but not for this method"? Which 4xx would fit better?
//   2. Imagine 30 routes. Which parts of this file would repeat 30 times?
//   3. List what you did by hand here that you expect Express to do for you.
// =============================================================
