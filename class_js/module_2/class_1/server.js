// =============================================================
// Module 2 · Class 1: A route for each HTTP method
// (Rotas para cada método HTTP)
// =============================================================
//
// Carried forward from module 1 class 5 — /, /sobre, /tarefas/inexistente
// untouched. Today /tarefas stops being a hardcoded JSON array and becomes
// your first real, mutable (if small) in-memory resource: GET lists it,
// POST adds to it. This is the start of the "tarefas" API the whole book
// builds toward.
//
// RUN:   node class_js/module_2/class_1/server.js
// =============================================================

const express = require('express');
const app = express();


// -------------------------------------------------------------
// STEP 1: app.use(express.json())
// -------------------------------------------------------------
// express.json() is a built-in MIDDLEWARE (full topic next module — for now
// just know it's a function that runs on every request before your route
// handlers). It reads the request body, and if it's valid JSON, parses it
// and puts the result on req.body. Without this line, req.body is
// undefined even if the client sent perfectly good JSON — there is no
// default parsing in Express.
//
//   Python flavor:  Flask/FastAPI parse the body for you automatically;
//                   Express makes you opt in, explicitly, with this line.
//
// Must be registered BEFORE any route that reads req.body — put it right
// after `const app = express();`.
//
//   TODO: app.use(express.json());
// app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/sobre', (req, res) => {
    res.send('API de aprendizado construida com express');
});


// -------------------------------------------------------------
// STEP 2: A shared, mutable list of tasks
// -------------------------------------------------------------
// Until now, the two tasks lived INSIDE the GET /tarefas handler — a new
// literal array built fresh on every request, thrown away right after.
// For POST to add a task that GET later sees, both routes need to read
// and write the SAME array in memory. That means the array must live
// OUTSIDE any single route, at the top level of the file.
//
//   Python flavor:  a module-level list, same idea as a global in a
//                   small Flask app.
//   JS:              `let`, not `const` — you're not reassigning the
//                     variable itself, but .push() below mutates what it
//                     points to, so `const` would still technically work
//                     here too; the book uses `let` for arrays it expects
//                     to grow. Either is fine conceptually; use `let` to
//                     match the chapter.
//
// This is "em memória" storage (the book's own term) — it lives only in
// this process's RAM. Restarting the server wipes it back to these two.
//
//   TODO: declare, at the top level (same indentation as `const app = ...`):
//     let tarefas = [
//       { id: 1, titulo: 'Estudar Express', completa: false },
//       { id: 2, titulo: 'Fazer compras', completa: true },
//     ];
let tarefas = [
    {id: 1, titulo: 'Estudar Express', completa: false},
    {id: 2, titulo: 'Fazer compras', completa: true},
];

// -------------------------------------------------------------
// STEP 3: GET /tarefas now reads the shared array
// -------------------------------------------------------------
// Keep your console.log lines from last class if you want them (optional,
// they're just for inspecting req — harmless either way). The only real
// change: res.status(200).json([...]) currently sends a hardcoded array;
// point it at the `tarefas` variable from Step 2 instead, so it reflects
// whatever's actually in memory — including anything POST adds later.
//
//   TODO: replace the hardcoded array literal with the `tarefas` variable
app.get('/tarefas', (req, res) => {
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers['user-agent']);
    res.status(200).json(tarefas);
});


// -------------------------------------------------------------
// STEP 4: POST /tarefas — creating a resource
// -------------------------------------------------------------
// Same app.METHOD(path, handler) shape, new method: app.post. The handler
// reads what the client sent via req.body (only populated because of
// Step 1!), builds a new task object, pushes it onto `tarefas`, and sends
// it back.
//
//   const novaTarefa = {
//     id: tarefas.length + 1,
//     titulo: req.body.titulo,
//     completa: false,
//   };
//
// Status 201, not 200: Protocolos da Web módulo 4 covers this — 201
// specifically means "created," distinct from "200 OK." Chain it the same
// way as before: res.status(201).json(novaTarefa).
//
//   TODO: app.post('/tarefas', (req, res) => { ...build novaTarefa, push
//   it onto tarefas, res.status(201).json(novaTarefa) })
app.post('/tarefas', (req, res) => {
    const novaTarefa = {
        id: tarefas.length + 1,
        titulo: req.body.titulo,
        completa: false,
    };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});


app.get('/tarefas/inexistente', (req, res) => {
    res.status(404).send('Recurso não encontrado');
});


app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});


// =============================================================
// TEST (in a second terminal, while the server is running)
// =============================================================
//   curl -i http://localhost:3000/tarefas
//
//   curl -i -X POST http://localhost:3000/tarefas \
//     -H "Content-Type: application/json" \
//     -d '{"titulo":"Ler um capitulo"}'
//
//   curl -i http://localhost:3000/tarefas        # run GET again — 3 tasks now?
//
// -X POST sets the method, -H sets a request header (telling the server
// the body IS json — express.json() only parses the body when this header
// says so), -d sends the body itself.
//
// REFLECT (answer in NOTES.md):
//   1. Comment out your app.use(express.json()) line, restart the server,
//      and repeat the POST curl command. What does the new task's `titulo`
//      come back as, and why? (Put the line back after testing!)
//   2. Why 201 for a successful POST instead of 200?
//   3. Stop the server (Ctrl+C) and start it again, then GET /tarefas.
//      Is the task you added via POST still there? Why / why not?
// =============================================================
