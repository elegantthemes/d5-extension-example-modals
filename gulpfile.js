const gulp = require('gulp');
const zip = require('gulp-zip');

/**
 * Zip task - Creates a distribution package of the plugin
 * Excludes development files and includes only production-ready files
 */
function zipTask() {
    return gulp.src([
        '**/*',
        '!node_modules/**',
        '!src/**',
        '!.git/**',
        '!.gitignore',
        '!gulpfile.js',
        '!package.json',
        '!package-lock.json',
        '!yarn.lock',
        '!*.zip',
        '!.DS_Store',
        '!Thumbs.db',
        '!.vscode/**',
        '!.idea/**',
        '!*.log',
        '!.env*',
        '!composer.json',
        '!composer.lock',
        '!phpunit.xml*',
        '!tests/**',
        '!.phpcs.xml*',
        '!.eslintrc*',
        '!.prettierrc*',
        '!webpack.config.js',
        '!rollup.config.js'
    ], {
        base: '.',
        dot: false
    })
    .pipe(zip('d5-extension-example-modals.zip'))
    .pipe(gulp.dest('.'));
}

// Export tasks
exports.zip = zipTask;
exports.default = zipTask;