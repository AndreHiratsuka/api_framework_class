// =============================================================
// Module 1 · Class 3: Your first Express server
// (Subindo seu primeiro servidor Express)
// =============================================================
//
// GOAL
// Forget the raw `http` version from class 1 — this chapter starts a FRESH
// file, now using Express. No routes yet (that's class 4); just get the
// server itself up and listening.
//
// RUN (from the project root):  node class_js/module_1/class_3/server.js
// STOP:                         Ctrl+C
// =============================================================


// -------------------------------------------------------------
// STEP 1: Import Express
// -------------------------------------------------------------
// Same require() pattern as class 1, but this time the module isn't built
// into Node — it's the package you installed into class_js/node_modules/
// back in class 2 (npm install express). require() finds it there
// automatically because this file lives inside class_js/.
//
//   TODO: import 'express' into a const named express
const express = require('express');


// -------------------------------------------------------------
// STEP 2: Create the Express application
// -------------------------------------------------------------
// express() is a FUNCTION CALL (note the parentheses) that returns the
// "app" object — this is what class 1 built by hand with http.createServer.
// You'll use `app` for everything from here on: declaring routes,
// registering middleware, and starting the server.
//
//   Python flavor:  app = create_app()   (if Flask/FastAPI-like)
//   JS:              const app = express();
//
//   TODO: call express() and store the result in a const named app
const app = express();


// -------------------------------------------------------------
// STEP 3: Start listening
// -------------------------------------------------------------
// app.listen(port, callback) — same shape as class 1's server.listen().
// Internally, Express is still using Node's http module underneath; it's
// just wrapping it so YOU don't have to call http.createServer by hand.
//
// Reuse port 3000. Log exactly:  Servidor rodando em http://localhost:3000
//
//   TODO: app.listen(...)
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});


// =============================================================
// TEST (in a SECOND terminal, while the server is running)
// =============================================================
//   curl -i http://localhost:3000/
//
// There are NO routes registered yet, so Express itself answers with its
// own default response for an unmatched path — compare it to class 1's
// hand-written 404 (Protocolos da Web, módulo 4).
//
// Now try starting a SECOND server while the first is still running
// (new terminal, same command):
//   node class_js/module_1/class_3/server.js
//
// Read the error Node/Express prints. It's the EADDRINUSE error the
// chapter describes — it's an operating-system thing, not an Express bug.
//
// REFLECT (answer in NOTES.md):
//   1. Compare this file to class 1's: how many lines did it take just to
//      get a server listening, with vs. without Express?
//   2. What did curl show for `/` with no routes defined? How is Express's
//      default different from the 404 you wrote by hand in class 1?
//   3. What did the EADDRINUSE error say, and what are the two ways to fix it?
// =============================================================
