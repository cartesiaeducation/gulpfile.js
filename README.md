# Gulpfile.js - The Saiyan Build Project

## Get started

### Installation

- `git submodule add git@github.com:cartesiaeducation/gulpfile.js.git`
- `npm install --save ./gulpfile.js`
- `cp gulpfile.js/gulpconfig.template.json ./gulpconfig.json`
- Customize gulpconfig.json as needed
- Add each needed `npm run …` command to project's *package.json* "scripts". See [Kamehameha](#kamehameha)

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
 
## Improvements

- Move to Gulp 4
- Compress images only once
- "mytask:prod" should trigger revision
- "mytask:watch" should trigger live reloading