# M1C3: Subindo seu primeiro servidor Express

## What I learned
-

## What confused me
- **I don't get why curl returned 404 instead of 200. What is curl?**

  **Claude:** `curl` is a command-line tool for sending HTTP requests by hand — no browser, no
  GUI, just type the request and get the raw response back. `curl -i` prints the status line and
  headers too, not just the body.

  The 404 is correct, not a bug: `server.js` only imports Express, creates `app`, and calls
  `app.listen`. No route (`app.get('/', ...)`) is registered yet — that's class 4. With nothing
  matching `/`, Express falls back to its own default "no route found" response, 404. In class 1
  you wrote that same fallback by hand; here Express gives it to you for free.

- **I tried to start a second server in another terminal, but it worked and didn't return an
  error. Wasn't it supposed to fail?**

  **Claude:** Checked with `lsof -i :3000` while a server was running — the process holding the
  port showed up as `MainThread`, not `node`. That means something other than your server itself
  (a supervisor/forwarding layer that this sandboxed dev environment puts in front of each
  terminal) sits between your Node process and the real network. Each terminal here likely gets
  its own isolated network view, so two "localhost:3000"s across different terminals may not
  actually race for the same OS-level socket — hence no collision, no `EADDRINUSE`. That's a quirk
  of this particular setup, not a gap in your understanding: on a normal, non-sandboxed machine,
  two processes really do fight over the same port and the second one fails. See Q3 below for what
  that failure looks like and how to fix it.

## Python equivalent
-

## Reflection
1. **Lines needed to get a listening server, http vs Express:**
   the framework helps to reduce the number of lines to write

2. **Express's default response for an unmatched route vs. class 1's manual 404:**
   returned http 404

3. **The EADDRINUSE error and its two fixes:**

   **Claude** (live reproduction wasn't possible in this sandboxed setup — see the note on the
   second doubt above — so here's the conceptual answer straight from the chapter): on a normal
   machine, starting a second `node server.js` while the first is still listening on port 3000
   prints `Error: listen EADDRINUSE: address already in use :::3000` — the operating system only
   lets one process bind a given port at a time, and a second attempt is rejected. The two fixes:
   (1) stop the process already using the port (`Ctrl+C` in its terminal), or (2) change the port
   in `app.listen(...)` to something free, e.g. 3001.
