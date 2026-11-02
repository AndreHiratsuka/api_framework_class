// =============================================================
// Module 1 · Class 5: req and res — testing in the browser and curl
// (Os objetos req e res: testando no navegador e no curl)
// =============================================================
//
// Carried forward from class 4 — /, /sobre, /tarefas already correct.
// This class's job: look INSIDE req and res (you've been using them, now
// meet what they actually carry), add one more route, and compare testing
// in a browser vs curl.
//
// RUN:   node class_js/module_1/class_5/server.js
// =============================================================

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/sobre', (req, res) => {
    res.send('API de aprendizado construida com express');
});


// -------------------------------------------------------------
// STEP 1: Look inside req (o objeto req)
// -------------------------------------------------------------
// req is the incoming request — everything the client sent. You've used it
// since class 1 (req.method, req.url in your raw-http if-checks), but never
// actually looked at what's inside it. Useful fields at this stage:
//   req.method   -> 'GET', 'POST', ...              (you already know this)
//   req.url      -> path + query string
//   req.path     -> just the path, no query string
//   req.headers  -> object with every header the client sent, lowercased
//                   keys, e.g. req.headers['user-agent']
//
//   Python flavor:  request.headers.get('user-agent')   (Flask/requests-ish)
//   JS:              req.headers['user-agent']           (bracket access,
//                     because 'user-agent' has a dash — can't write
//                     req.headers.user-agent, JS would read that as
//                     subtraction)
//
// TODO: inside the /tarefas handler below, BEFORE the res. call, add three
// console.log lines printing req.method, req.url, and req.headers['user-agent']


// -------------------------------------------------------------
// STEP 2: res.status(), chained
// -------------------------------------------------------------
// res.status(code) sets the status code. It returns `res` again, so you
// can chain straight into .json(...) or .send(...) on the same line:
//   res.status(200).json([...])
//   res.status(404).send('...')
//
// If you never call res.status, Express defaults to 200 on success — so
// Step 2 doesn't CHANGE behavior, it makes the 200 explicit, matching the
// chapter's example and today's quiz.
//
// TODO: update /tarefas's existing res.json(...) call to res.status(200).json(...)
app.get('/tarefas', (req, res) => {
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers['user-agent']);


    res.status(200).json([
        { id: 1, titulo: 'Estudar Express' },
        { id: 2, titulo: 'Criar a primeira rota' }
    ]);
});


// -------------------------------------------------------------
// STEP 3: A route that answers with an error status
// -------------------------------------------------------------
// Same res.status(...).send(...) chain, now with an error code and a text
// body instead of JSON — this is today's other new route.
//
//   TODO: app.get('/tarefas/inexistente', ...) -> res.status(404).send('Recurso não encontrado')
app.get('/tarefas/inexistente', (req, res) => {
    res.status(404).send('Recurso não encontrado');
}) ;


app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});


// =============================================================
// TEST — do BOTH of these, they show different things
// =============================================================
// A) Browser: open http://localhost:3000/tarefas in an actual browser tab.
//    You'll see the JSON body. You will NOT see the status code or headers
//    directly, and you can only ever send GET this way (typing a URL in
//    the address bar can't do POST/PUT/DELETE).
//
// B) curl, from a second terminal (server still running in the first):
//      curl http://localhost:3000/tarefas
//      curl -i http://localhost:3000/tarefas
//      curl -i http://localhost:3000/tarefas/inexistente
//
//    Compare the plain curl (just the body, like the browser) against
//    curl -i (status line + headers + body). Also check your FIRST
//    terminal's output — your three console.log lines should have printed
//    there for every /tarefas request, browser or curl.
//
// REFLECT (answer in NOTES.md):
//   1. In one sentence each: what does req carry, and what does res carry?
//   2. Look at what req.headers['user-agent'] printed for a browser request
//      vs. a curl request, in your terminal. Were they the same string?
//      What does that tell you about where that header's value comes from?
//   3. Name two concrete things curl can show you about a response that
//      a browser address bar cannot.
// =============================================================
