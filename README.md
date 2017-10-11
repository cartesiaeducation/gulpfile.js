# Gulpfile.js - The Saiyan Build Project

## Get started

### Installation

- `npm install git+ssh://git@github.com/cartesiaeducation/gulpfile.js.git#vX.X.X` with X.X.X the version you desire
- `cp ./node_modules/gulpfile.js/gulpconfig.template.json ./gulpconfig.json`
- Customize gulpconfig.json as needed
- Add each task to your project's package.json e.g. :
```
  "scripts": {
    "dev": "gulp dev --gulpfile ./node_modules/gulpfile.js",
    "prod": "gulp prod --gulpfile ./node_modules/gulpfile.js",
    "build": "gulp build --gulpfile ./node_modules/gulpfile.js",
    "watch": "gulp watch --gulpfile ./node_modules/gulpfile.js",
    "clean": "gulp clean --gulpfile ./node_modules/gulpfile.js"
  },
```
- You can now use `npm run myTask`

### Kamehameha

- Development mode : `npm run dev` (build, watch)
- Production mode : `npm run prod` (optimized build)
- Task dev mode : `npm run mytask:dev` (task specific build)
- Task prod mode : `npm run mytask:prod` (task specific optimized build, without revision)
- Task watch mode : `npm run mytask:watch` (task specific watching, without live reload)
- Build once in dev mode : `npm run build` (does not watch)
- Watch files in dev mode : `npm run watch` (saves time if you know files are already built)
- Clean builds : `npm run clean` (deletes dist folder)
- Create revision : `npm run rev` (testing purpose only)

## How the fuck does this work ?

- You type `npm run dev` in the terminal
- It looks for "dev" key in "scripts" within the project's *package.json* and run its command, here `gulp dev`
- `gulp dev` runs "dev" task in *gulpfile.js*
- *index.js* requires all tasks manually
- *manager.js* handles default and project specific configuration
- "clean" is launched before each initial command to prevent old files from being kept
- Each task is responsible for its "dev", "prod" and "watch" modes
- "watch" initializes live reloading and requires all watch tasks
- "rev" adds revision to all files except static and creates rev-manifest.json
 