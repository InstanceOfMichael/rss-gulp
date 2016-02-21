module.exports = function(gulp,plumber,rollbar,notify)
{
    // @link https://gist.github.com/floatdrop/8269868#gistcomment-1428507
    const _gulpsrc = gulp.src;
    gulp.src = function() {
        return _gulpsrc.apply(gulp, arguments)
        .pipe(plumber({
            errorHandler: function(err) {
                var env;
                if ({production:1,presentation:1}[process.env.APP_ENV||'dev'])
                {
                    rollbar.reportMessage(err.message, 'error', err);
                }
                notify.onError({
                    title:    "Gulp Error",
                    message:  "Error: <%= error.message %>",
                    sound:    "Bottle"
                })(err);
                this.emit('end');
            }
        }));
    };
};
