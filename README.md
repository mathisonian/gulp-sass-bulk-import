gulp-sass-bulk-import
=====================

gulp task to allow importing directories in your SCSS


## usage


```js
 var bulkSass = require('gulp-sass-bulk-import');

gulp.task('css', function() {
    return gulp
            .src(srcDir + 'stylesheets/app.scss')
            .pipe(bulkSass())
            .pipe(
                sass({
                    includePaths: ['src/stylesheets']
                }))
            .pipe( gulp.dest('./public/css/') );
});
```

