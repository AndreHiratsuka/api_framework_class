# M1C4: Sua primeira rota, recebendo requisições

## What I learned
-

## What confused me
- **why do i use -i in curl**

  **Claude:** by default, `curl` only prints the response *body* — just the text or JSON, nothing
  else. `-i` ("include") tells it to also print the status line (`HTTP/1.1 200 OK`) and every
  response header above the body. You want `-i` whenever you're checking *how* the server
  answered (status code, `Content-Type`), not just *what* it answered. Without `-i`, `curl
  http://localhost:3000/tarefas` would show you only the JSON array, with no way to tell it was a
  200 or what Content-Type Express picked.

## Python equivalent
-

## Reflection
1. **The three parts that make up "a route":**

   HTTP method + path + handler function — e.g. in `app.get('/sobre', (req, res) => {...})`:
   `get`, `'/sobre'`, and the `(req, res) => {...}` function.

2. **Content-Type res.send vs res.json each set, and why no manual header this time:**

   No manual header because Express sets it for us. `res.send()` sends a string (or quietly calls
   `res.json()` for you if given an object), while `res.json()` explicitly serializes data and
   sets the JSON Content-Type.

3. **Two app.get('/tarefas', ...) declared back to back — which handler answers?**

   Only the first matching handler runs. Express checks routes in declaration order and stops at
   the first match, so the second `app.get('/tarefas', handlerB)` never executes for a real request.