# api_framework — learning track

Purely educational project. The user is learning back-end by implementing, class by class, the book
`data/apis-e-frameworks.epub` (7 modules × 5 classes, Node + Express), after having studied
`data/protocolos-da-web.epub`. The user's background is data science / Python; they know **no JavaScript**.

## Tracks

1. **class_js/**: all 35 classes in the book's exact stack: plain JavaScript, CommonJS (`require`),
   Express, Zod, nodemon, dotenv, helmet, morgan, supertest. No TypeScript, no ESM.
2. **class_py/** (after the Express track): FastAPI capstone. Rewrite the module 6 tasks CRUD (layers,
   validation, error format, .env) plus the module 7 extras (logging, CORS, pytest + TestClient).
   Use `python3 -m venv` + pip (Python 3.10). No step-by-step skeletons here: give a mapping table
   from Express concepts to FastAPI and let the user translate their own JS project.

## Layout

```
class_js/
├── package.json          # ONE shared npm project (created by the user in M1C2 via npm init)
├── node_modules/
└── module_N/class_K/
    ├── server.js         # the exercise (more files as the book's structure grows)
    └── NOTES.md          # the user's notes
```

Run from the project root, e.g. `node class_js/module_1/class_3/server.js`.

## Workflow per class (one class at a time, never prepare ahead)

1. **Create the class folder.** Starting code = the user's own code from the previous class *after review
   fixes* (carry forward), plus the new class's TODOs.
2. **TODO skeleton**: step-by-step comments with empty `TODO`s. No solution anywhere.
   - Comments in English, with the book's Portuguese term in parentheses when a concept first appears,
     e.g. `route parameters (parâmetros de rota)`.
   - Explain JS syntax by comparison with Python (`&&` ↔ `and`, arrow function ↔ lambda/def, etc.).
   - Syntax and concept tips are fine. Do not write the lines that are the point of the class.
   - Point back to chapters of both books where a concept comes from.
   - Include the `curl -i` commands to test (curl, like the book; no Postman or .http files).
   - Also create `NOTES.md` with the template: What I learned / What confused me / Python equivalent /
     Reflection.
3. **The user writes and runs the code.**
4. **Review.** Point out each problem: what's wrong, why, a hint, and the related concept or chapter.
   **Never edit the user's code files.** The user fixes it and you re-check.
   - **NOTES.md is different**: when the user writes a question under "What confused me", or their
     Reflection answer is missing/wrong, write the explanation or hint directly inside `NOTES.md`
     (right under their question/answer), prefixed **Claude:**, instead of leaving it only in chat
     — so it stays as part of their study notes. This never replaces the user's own answer line;
     it sits alongside it, and the user still writes/revises their own wording. Keep the file
     clean while doing this — one reflection list (bold question + the user's answer beneath, no
     leftover comment-copy artifacts), no duplicated question blocks.
5. **Clean the Reflection section once the class is finished** (every Reflection question has a
   correct/complete answer) — right before the quiz. For each question: merge the user's own
   wording with any **Claude:** explanation into one improved answer in the user's voice, concise
   (don't pad it), then delete the **Claude:** comment entirely. Only Reflection gets this
   cleanup — leave "What confused me" **Claude:** answers in place always, they're not touched.
6. **Quiz.** Use the chapter's "Quiz da aula" questions (answers are in its "Gabarito"), asked with
   AskUserQuestion: max 4 questions per call, so 5 questions take two calls. Don't mark any option as
   recommended and don't hint at the answer. Explain each wrong answer afterwards.
7. **Commit** once the class is reviewed and fixed, one commit per class: `m1c3: first express server`.

## Reading the book

Chapters are XHTML files inside the epub, in reading order (module N, class K = the K-th file
for module N):

```sh
unzip -Z1 data/apis-e-frameworks.epub 'OEBPS/text/ch-*'                        # list chapters
unzip -p data/apis-e-frameworks.epub 'OEBPS/text/ch-modulo-1-*framework*' \
  | sed -e 's/<\/p>/\n/g' -e 's/<\/pre>/\n/g' -e 's/<[^>]*>//g'                # read one as text
```

`data/` is gitignored (it holds the books).
