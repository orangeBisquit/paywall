import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

global.gsap = gsap;

gsap.defaults({
	overwrite: 'auto',
});

class ProjectApp {
	constructor() {
		this.env = require('./utils/env').default;
		this.utils = require('./utils/utils').default;
		this.classes = {
			Signal: require('./classes/Signal').default,
		};
		this.components = {};
		this.helpers = {};
		this.modules = {
			Header: require('./modules/Header').default,
			VideoAnimations: require('./modules/VideoAnimations').default,
			Calculator: require('./modules/Calculator').default,
			PageEffects: require('./modules/PageEffects').default,
			ReviewsSlider: require('./modules/ReviewsSlider').default,
			MenuModal: require('./modules/MenuModal').default,
			Mailing: require('./modules/Mailing').default,
			Cookie: require('./modules/Cookie').default,
			PageScrolling: require('./modules/PageScrolling').default,
		};
		document.addEventListener('DOMContentLoaded', () => {
			document.documentElement.classList.remove('_loading');
		});
	}
}

global.ProjectApp = new ProjectApp();

if (module.hot) {
	module.hot.accept();
}
