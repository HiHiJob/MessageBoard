var gulp  = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

// 复制src中除了/js/index.js之外所有文件到dist中
gulp.task('copyfile',function(){
    return gulp.src(['./src/**/*','!./src/js/index.js']).
    pipe(gulp.dest('./dist/'));
})

// index.js依赖于react，对此文件进行了压缩（压缩方式参考《React精髓》）
gulp.task('default',['copyfile'],function(){
    return browserify('./src/js/index.js')
           .transform(babelify,{presets: ['react']})
           .bundle()
           .pipe(source('index.js'))
           .pipe(gulp.dest('./dist/js'));
})