// =============================================================
// Module 1 · Class 4: Your first route, receiving requests
// (Sua primeira rota: recebendo requisições)
// =============================================================
//
// Carried forward from class 3 — require/app/listen are already correct.
// This class's job: add routes BETWEEN app = express() and app.listen(...),
// so / stops 404-ing and two more paths exist.
//
// GOAL: three GET routes
//   GET /         -> text, "Olá, mundo!"
//   GET /sobre    -> text, "API de tarefas construída com Express."
//   GET /tarefas  -> JSON array of task objects
//
// RUN:   node class_js/module_1/class_4/server.js
// =============================================================

const express = require('express');
const app = express();


// -------------------------------------------------------------
// STEP 1: Anatomy of a route (anatomia de uma rota)
// -------------------------------------------------------------
// A route = an HTTP method + a path + a handler function, all three
// together. Express picks which handler runs by matching the incoming
// request's method AND path against every route you've declared, in the
// order you declared them (first match wins — more on that in the quiz).
//
// Shape:
//   app.METHOD(path, (req, res) => {
//     // ...
//   });
//
// You already know req/res from class 1 — same two objects, Express just
// hands them to a function PER ROUTE now instead of one giant handler with
// manual if-checks.
//
// res.send(body) is new: it's a general-purpose "send this back" — figures
// out a reasonable Content-Type for you (text here, since you're passing
// a string). You'll meet res.json() again in Step 3 below for an object.
//
//   TODO: app.get('/', ...) -> res.send('Olá, mundo!')
app.get('/', (req, res) =>{
    res.send('Hello, world!');
});


// -------------------------------------------------------------
// STEP 2: A second route, same pattern
// -------------------------------------------------------------
// Nothing new syntactically — just prove to yourself that multiple routes
// coexist independently. This is the "app.get/app.post/app.put/app.patch/
// app.delete, one per HTTP method" table from the chapter; today only GET.
//
//   TODO: app.get('/sobre', ...) -> res.send('API de tarefas construída com Express.')
app.get('/sobre', (req, res) => {
    res.send('API de aprendizado construida com express');
});


// -------------------------------------------------------------
// STEP 3: A route answering JSON
// -------------------------------------------------------------
// res.json(data) does for an array/object what res.send did for a string:
// sets the right Content-Type AND serializes it for you — the
// JSON.stringify call from class 1 is gone, Express does it internally.
//
//   Python flavor:  return jsonify([...])   (Flask)  /  return [...] (FastAPI)
//
// Build an array of two task objects, each with `id` (number) and `titulo`
// (string) — pick any two task names you like.
//
//   TODO: app.get('/tarefas', ...) -> res.json([ {...}, {...} ])
app.get('/tarefas', (req, res) => {
    res.json([
        { id: 1, titulo: 'Estudar Express' },
        { id: 2, titulo: 'Criar a primeira rota' }
    ]);
});


// -------------------------------------------------------------
// STEP 4: Start listening (already here from class 3 — don't duplicate it)
// -------------------------------------------------------------
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});


// =============================================================
// TEST (in a second terminal, while the server is running)
// =============================================================
//   curl -i http://localhost:3000/
//   curl -i http://localhost:3000/sobre
//   curl -i http://localhost:3000/tarefas
//   curl -i http://localhost:3000/nao-existe
//
// Compare the Content-Type header on /  vs  /tarefas — res.send vs
// res.json chose differently, on their own, based on what you passed them.
//
// REFLECT (answer in NOTES.md):
//   1. What are the three parts that together make up "a route"?
//   2. What did res.send and res.json each set as Content-Type, and why
//      didn't you have to set it by hand this time (compare to class 1)?
//   3. If you declared app.get('/tarefas', handlerA) and then, below it,
//      another app.get('/tarefas', handlerB) — which one would answer a
//      real request? (Don't test it yet — answer from reasoning, the quiz
//      covers this.)
// =============================================================
