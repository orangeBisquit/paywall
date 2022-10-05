import gulp from 'gulp';

import PATHS from '../paths';

export default function fonts() {
	return gulp.src(PATHS.src.videos).pipe(gulp.dest(PATHS.build.videos));
}
