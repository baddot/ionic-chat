// 4 necessary parameters every task needs
var gulp = require('gulp');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: true});
var args = require('yargs').argv;

// read task list from folder /tasks
var taskList = require('fs').readdirSync('./www/gulp/tasks/');
taskList.forEach(function (file) {
    require('./tasks/' + file)(gulp, config, $, args);
    // require('./tasks/task_modules/' + file)(gulp, config, $, args);
});

// default task: list all tasks
gulp.task('default', ['help']);
gulp.task('help', $.taskListing);

