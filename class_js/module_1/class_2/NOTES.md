# M1C2: Iniciando um projeto Node.js com Express

## What I learned
-

## What confused me
-

## Python equivalent
-

## Reflection
1. Command a teammate runs after cloning to restore node_modules:
2. package.json vs package-lock.json:
3. Why package.json matters even though node_modules has the real code:


1. `node_modules/` is never committed to git. If a teammate clones this repo, what single
   command do they run to get it back?

   they go npm install

2. What's the difference between what `package.json` and `package-lock.json` each store?
json is what npm install for me. lock writes dependencies and version, so if another user tries to clone this repo it will install the exact same thing
3. Why does `package.json` matter even though `node_modules/` has the actual code?
while node modules has all the information, the json file is human friendly