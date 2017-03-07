# Gulp and Gulp Starter

To start developping run `npm run development` and add `:3000` to your url.

- Watches your front-end files and reloads the browser
- Compiles CSS, adds sourcemaps, autoprefixes and minify
- Compiles JS, adds sourcemaps, minify…
- Optimizes images
- Converts svg icons in a sprite or an icon font

This gulp folder is based on [gulp-starter](https://github.com/vigetlabs/gulp-starter). It replaces a single long gulpfile.js. This folder is customizable and should be customized, feel free to adapt the code to your needs or even add your own task file in `tasks`.

##Used GS components
- **Sass**
- **JS**
- **Images**
- **Fonts**
- **Icons**

##Removed GS components
- **HTML**
- **Production**
- **Rev**
- **Deployment**

##Unused but useful components
- **Icon Fonts,** as long as we use LESS (works with sass)
- **JS Testing,**, with [Karma](http://karma-runner.github.io/0.12/index.html), [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/) and [Sinon](http://sinonjs.org/)

## Components we should dig into
- **Webpack**
- **Travis CI integration**

# Custom tasks

## Less support
Custom less support added.

- `less.js` file in `tasks` folder
- `less` in `config.json` tasks
- `less` in `var codeTasks` inside `lib/getEnabledTasks.js`
- `less` in `var watchableTasks` inside `tasks/watch.js`

Once this project is migrated to sass, remove these and replace `less` by `sass` in enabledTasks in `config.json`.

# Upcoming features

- JSDoc
- esLint (fine tuning)
- Javascript testing unit
- SassDoc
- SassLint

# Trouble shooting
## Watch ENOSPC

Run :

```bash
$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
``` 

It increases watched files limit.