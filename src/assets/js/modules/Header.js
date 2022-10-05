import utils from '../utils/utils';

const CLASS__ANIMATED = 'animated-long';

class Header {
	constructor() {
		this.header = document.querySelector('header');
		this.headerContainer = this.header.querySelector('.header__container');
		this.headerInner = this.header.querySelector('.header__inner');
		this.heroSection = document.querySelector('.hero');
		this.lastYOffset = 0;
		this.pageVH = window.innerHeight;
		this.currentYear = document.querySelector('[data-current-year]');

		this.init();
	}

	init = () => {
		this.headerHeight = this.header.offsetHeight;

		window.addEventListener('scroll', this.onWindowScroll, false);

		this.initTransition();

		this.currentYear.innerHTML = new Date().getFullYear();
	};

	checkHeightChange = () => {
		if (this.pageVH !== window.innerHeight) {
			this.pageVH = window.innerHeight;
			return true;
		}
		return false;
	};

	initTransition = () => {
		this.headerContainer.classList.add(CLASS__ANIMATED);
		this.headerInner.classList.add(CLASS__ANIMATED);
	};

	onWindowScroll = () => {
		const isBarShown = this.checkHeightChange();
		const st = window.pageYOffset || document.documentElement.scrollTop;

		const isHeaderScrolledDown = st - this.lastYOffset > 4;
		const isHeaderScrolledUp = st - this.lastYOffset < -4;
		const isTopOfPage = document.body.getBoundingClientRect().top === 0;

		this.headerHeight = this.header.offsetHeight;

		this.isSticky = this.header.classList.contains('_sticky');
		console.log(isBarShown);
		if (isBarShown) return;

		if (!this.isSticky && isHeaderScrolledDown) {
			this.hideInitialHeader();
		}
		if (isTopOfPage) {
			this.header.classList.remove('_sticky');
			this.showHeader();
		}
		if (isHeaderScrolledDown && this.isSticky) {
			this.hideHeader();
		}
		if (isHeaderScrolledUp && this.isSticky) {
			this.showHeader();
		}
		this.lastYOffset = st <= 0 ? 0 : st;

		if (window.innerWidth < 1920 && window.innerWidth > 1024) {
			this.headerContainer.style.paddingLeft = `(100vw - 1370px) / 2)`;
			this.headerContainer.style.paddingRight = `(100vw - 1370px) / 2)`;
		} else if (window.innerWidth > 1920) {
			this.headerContainer.style.paddingLeft = '15%';
			this.headerContainer.style.paddingRight = '15%';
		}
	};

	hideHeader = () => {
		gsap.to(this.header, {
			y: -this.headerHeight,
			position: 'fixed',
			duration: 0.25,
			delay: 0,
		});
	};

	hideInitialHeader = () => {
		gsap.to(this.header, {
			y: -this.headerHeight * 2,
			position: 'fixed',
			duration: 0.35,
			delay: 0,
			onComplete: () => this.header.classList.add('_sticky'),
		});
	};

	showHeader = () => {
		gsap.to(this.header, {
			y: 0,
			position: 'fixed',
			duration: 0.25,
			delay: 0,
		});
	};
}

export default new Header();
