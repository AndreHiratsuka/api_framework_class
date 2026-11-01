# Module 1 · Class 2: Starting a Node.js project with Express
# (Iniciando um projeto Node.js com Express)

## GOAL
No code to write this class — it's project setup (configuração de projeto). You'll create the
ONE shared npm project that every class from here on lives in: `class_js/`.

Run every command below from the **project root** (`/home/eikaum/projetos/api_framework`), unless
a step says otherwise.

---

### STEP 1 — Check your tools (verificando o ambiente)

The book checks Node and npm versions before starting. You already have them, but confirm:

```sh
node -v
npm -v
```

Any Node 18+ works. (You have Node 24 and npm 11 — newer than the book's v20/npm10, that's fine.)

---

### STEP 2 — Create the project (criando o projeto com npm init)

The book does `mkdir tarefas-api && cd tarefas-api && npm init -y`. You already have the folder
(`class_js/`), so just go in and init it:

```sh
cd class_js
npm init -y
```

`-y` accepts every default instead of asking you name/version/description one by one.
This generates `class_js/package.json` — the "ID document" of your project (name, dependencies,
scripts). Open it and look at what got generated.

TODO: run the command, then open `class_js/package.json` and read it.

---

### STEP 3 — Install Express (instalando o Express)

Still inside `class_js/`:

```sh
npm install express
```

This does three things at once:
1. Downloads Express (and everything it depends on) into `class_js/node_modules/`
2. Adds an entry under `"dependencies"` in `package.json`
3. Writes the exact installed versions to a new file, `package-lock.json`

TODO: run the command, then open `package.json` again — a `dependencies` section should now
exist with `"express"` in it.

---

### STEP 4 — Verify

```sh
ls class_js/node_modules | head         # should list many packages, including express
cat class_js/package.json               # dependencies.express should be there
git status                              # node_modules/ must NOT show up (it's gitignored)
```

TODO: confirm all three.

---

## REFLECT (answer in NOTES.md)
1. `node_modules/` is never committed to git. If a teammate clones this repo, what single
   command do they run to get it back?
2. What's the difference between what `package.json` and `package-lock.json` each store?
3. Why does `package.json` matter even though `node_modules/` has the actual code?
