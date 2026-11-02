# M1C5: Os objetos req e res, testando no navegador e no curl

## What I learned
-

## What confused me
-

## Python equivalent
-

## Reflection
1. **What req carries vs what res carries:**

   req carries the HTTP method, the url, and the headers. res carries the status code and the
   body (plus whatever headers Express sets on it).

2. **user-agent printed for browser vs curl — same or different, and what that tells you:**

   Different: curl's request printed short info about curl itself, while the browser's request
   printed my OS and browser info. user-agent is just a header the client chooses to send —
   nothing server-side enforces or verifies what it says.

3. **Two things curl shows that a browser address bar cannot:**

   The status code and the full response headers (e.g. Content-Type) — curl -i shows both,
   neither shows up directly when you type a URL into a browser.
