# M2C1: Rotas para cada método HTTP

## What I learned
-

## What confused me
-

## Python equivalent
-

## Reflection
1. **req.body without express.json() — what titulo comes back as, and why:**

   Without `express.json()`, nothing parses the request body, so `req.body` stays `undefined`.
   Reading `req.body.titulo` off `undefined` throws, which is why the response came back as a
   500 error.

2. **Why 201 instead of 200 for a successful POST:**

   201 is the status specifically for "created" — it fits a successful POST, unlike 200 which
   is just a generic OK.

3. **Restarting the server — is the POSTed task still there afterward? Why/why not:**

   It's gone — `tarefas` lives only in the process's RAM ("em memória"), so restarting `node`
   wipes it back to the original two tasks. Keeping it across restarts would need real storage,
   like a database.