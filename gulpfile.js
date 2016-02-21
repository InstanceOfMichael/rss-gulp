/*jshint -W100*/
require('dotenv').load();

const paths = {
    'dev': {
        'less':   './src/less/',
        'js':     './src/js/',
        'vendor': './src/vendor',
    },
    'production': { // more like "output" than "production"
        'css':   './dist/assets/css/',
        'js':    './dist/assets/js/',
        'fonts': './dist/assets/fonts/',
    }
};

const gulp = require('gulp'),
    less = require('gulp-less'),
    minify = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    replace = require('gulp-replace'),
    es = require('event-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpBabel = require('gulp-babel'),
    ll   = require('gulp-ll'),
    plumber = require('gulp-plumber'),
    streamSeries = require('stream-series')
;
rollbar = require('./gulp/rollbar');

require('./gulp/put_plumber_in_gulp_src')(gulp,plumber,rollbar,notify);

ll.tasks([
    'js',
    'css',
    'icons',
]);
/*
sudo npm install gulp-babel babel-preset-es2015 babel-preset-stage-0 -g
*/
var toES5 = function()
{
    return gulpBabel({
        // @link https://babeljs.io/blog/2015/10/31/setting-up-babel-6/
        // @link https://babeljs.io/docs/usage/options/
        // @link http://babeljs.io/docs/plugins/preset-stage-0/
        // @link http://babeljs.io/docs/plugins/preset-es2015/
        presets: ["es2015", "stage-0"],
        // plugins: ["transform-runtime"],
        compact:false, // uglify will perform this task
    });
};

process.env.ROLLBAR_PUBLIC_INSTANCE_ID = (function()
{
    // BG will mention if this is safe or not;
    process.env.PUBLIC_INSTANCE_ID = process.env.PUBLIC_INSTANCE_ID||process.env.INSTANCE_ID||'';
    var domain = (process.env.APP_DOMAIN+'').slice(-32);
    var leftPad = ((process.env.ROLLBAR_PUBLIC_INSTANCE_ID||process.env.PUBLIC_INSTANCE_ID||process.env.INSTANCE_ID||domain||'')+'')
        .replace(/[-._]/g,'')// remove slashes and underscores
        ;

    // leftPad = String(leftPad + Array(40).join('_')).slice(0,40);
    leftPad = leftPad.slice(0,32);

    // console.log({leftPad:leftPad});
    return leftPad;
})();
process.env.ROLLBAR_ACCESS_TOKEN_JS=process.env.ROLLBAR_ACCESS_TOKEN_JS||'a00b663c5ace4c1384bd8e2c967b30f9';

// CSS
gulp.task('css', function() {
  var gritterStream = gulp.src([
      paths.dev.less+'jquery.gritter.less'
    ])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(less())
    .pipe(replace('../images/','../img/gritter/'))
    ;

  var vendorLessStream = gulp.src([
      paths.dev.less+'vendor.less',
      paths.dev.less+'app.less',
      // paths.dev.less+'app.css',
    ])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(less())
    ;
  var vendorCssStream = gulp.src([
      paths.dev.vendor+'bootstrap-toggle/css/bootstrap-toggle.css'
    ])
    .pipe(sourcemaps.init({loadMaps: true}))
    ;

  return es.merge(vendorLessStream,vendorCssStream,gritterStream)
    .pipe(plumber())
    .pipe(concat('app.css'))
    .pipe(gulp.dest(paths.production.css))
    .pipe(minify({keepSpecialComments:0}))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(gulp.dest(paths.production.css));
});

gulp.task('js', function()
{
  const jsf = [
    paths.dev.js+'/rollbar.js',
    paths.dev.vendor+'rollbar/dist/rollbar.snippet.js',
    paths.dev.vendor+'jquery/dist/jquery.js',
    paths.dev.vendor+'es6-promise-polyfill/promise.js',
    paths.dev.vendor+'jquery.gritter/js/jquery.gritter.js',
    paths.dev.vendor+'kbw.countdown/jquery.countdown.js',
    paths.dev.vendor+'moment/moment.js',
    paths.dev.vendor+'livestampjs/livestamp.js',
    paths.dev.vendor+'bootstrap/dist/js/bootstrap.js',
    paths.dev.vendor+'bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js', //30 kb .min.js
    paths.dev.vendor+'fancybox/source/jquery.fancybox.js',
    paths.dev.vendor+'fancybox/source/helpers/jquery.fancybox-thumbs.js',
    paths.dev.vendor+'bootstrap-responsive-tabs/js/responsive-tabs.js',
    paths.dev.vendor+'bootstrap-toggle/js/bootstrap-toggle.js',
    paths.dev.vendor+'jquery-serialize-object/jquery.serialize-object.js',
    paths.dev.vendor+'jquery-throttle-debounce/jquery.ba-throttle-debounce.js',
    paths.dev.vendor+'bootbox/bootbox.js',
    paths.dev.vendor+'socket.io-client/socket.io.js',              //65kb .min.js
    paths.dev.vendor+'sg-laravel-array-helpers/laravel_helpers.js',
    paths.dev.vendor+'sg-laravel-array-helpers/spacegazebo_helpers.js',
    paths.dev.vendor+'sg-laravel-message-bag/src/MessageBag.js',
    paths.dev.js+'library/Array.unique.js',
    paths.dev.js+'library/findModel.js',
    paths.dev.js+'library/Function.bind.js',
    paths.dev.js+'library/isEmpty.js',
    paths.dev.js+'library/isInt.js',
    paths.dev.js+'library/IE.CustomEvent.js',
    paths.dev.js+'library/jQuery.exists.js',
    paths.dev.js+'library/jQuery.getCursorPosition.js',
    paths.dev.js+'library/jQuery.getModel.js',
    paths.dev.js+'library/jQuery.outerHTML.js',
    paths.dev.js+'library/Object.keys.js',
    paths.dev.js+'library/objectMerge.js',
    paths.dev.js+'library/phpjs.money_format.js',
    paths.dev.js+'library/phpjs.setlocale.js',
    paths.dev.js+'library/String.replaceAll.js',
    paths.dev.js+'library/String.startsWith.js',
    paths.dev.js+'alert.js',
    paths.dev.js+'localstorage.js',
    paths.dev.js+'selectall.js',
  ];

  var es5Stream = gulp.src(jsf,{base:'../templates/assets/'})
    .pipe(sourcemaps.init({loadMaps: true}))
    ;
  var es6Stream = gulp.src([
      paths.dev.js+'es6/AlertBag.js'
  ],{base:'../templates/assets/'})
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(toES5())
    ;

  return streamSeries(es5Stream,es6Stream)
    .pipe(replace('process.env.ROLLBAR_ACCESS_TOKEN_JS',process.env.ROLLBAR_ACCESS_TOKEN_JS))
    .pipe(replace('process.env.APP_ENV',process.env.APP_ENV))
    .pipe(replace('glyphicon-ok','fa-check'))
    .pipe(replace('glyphicon-remove','fa-times'))
    .pipe(replace('glyphicon-time','fa-clock-o'))
    .pipe(replace('glyphicon','fa'))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.production.js))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(gulp.dest(paths.production.js))
    ;
});

gulp.task('icons', function(){ 
    return gulp.src(paths.dev.vendor + '/font-awesome/fonts/**.*') 
        .pipe(gulp.dest(paths.production.fonts)); 
});

gulp.task('watch', function() {
  gulp.watch(paths.dev.less + '/*.less', ['css']);
  gulp.watch(paths.dev.js + '/*.js',     ['js']);
  gulp.watch(paths.dev.js + '/es6/*.js', ['js']);
});

gulp.task('deploy', [
  'js',
  'css',
  'icons',
]);
gulp.task('default', [
  'deploy',
  'watch'
]);
