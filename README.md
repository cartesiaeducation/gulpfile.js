# Gulpfile.js - The Saiyan Build Project

## Get started

### Installation

- `npm install git+ssh://git@github.com/cartesiaeducation/gulpfile.js.git#vX.X.X` with X.X.X the version you desire
- `cp ./node_modules/gulpfile.js/gulpconfig.template.json ./gulpconfig.json`
- Customize gulpconfig.json:
    - Change project name
    - Change BrowserSync options
    - Specify needed tasks
    - Add Javascript entry points (Webpack)
- Add each task to your project's package.json e.g.:
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

### Update
- Commit changes in gulpfile.js
- Update version with `npm version major|minor|patch|myCustomVersion` (creates git tag with version, see npm doc)
- Push newly created git tags and changes with `git push --tags origin master`
- Run `npm update gulpfile.js#vX.X.X` in your project

Note:
If you want to try changes rapidly without versioning, you can remove `#myVersion` in your project's gulpfile npm dependency and run `npm update gulpfile.js`. This will pull gulpfile.js origin master.

### Tasks command conventions
You have to manually add each gulp task in npm scripts.

- Development mode : `npm run dev` (build, watch)
- Production mode : `npm run prod` (optimized build)
- Task dev mode : `npm run mytask:dev` (task specific build)
- Task prod mode : `npm run mytask:prod` (task specific optimized build, without revision)
- Task watch mode : `npm run mytask:watch` (task specific watching, without live reload)
- Build once in dev mode : `npm run build` (does not watch)
- Watch files in dev mode : `npm run watch` (saves time if you know files are already built)
- Clean builds : `npm run clean` (deletes dist folder)
- Create revision : `npm run rev` (testing purpose only)

## How the fuck does this work?

- You type `npm run dev` in the terminal
- It looks for "dev" key in "scripts" within the project's *package.json* and run its command, here `gulp dev`
- `gulp dev` runs "dev" task in *gulpfile.js*
- *index.js* requires all tasks manually
- *manager.js* handles default and project specific configuration
- "clean" is launched before each initial command to prevent old files from being kept
- Each task is responsible for its "dev", "prod" and "watch" modes
- "watch" initializes live reloading and requires all watch tasks
- "rev" adds revision to all files except static and creates rev-manifest.json
 