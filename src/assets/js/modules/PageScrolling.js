class PageScrolling {
	constructor() {
		this.bindLinks();
	}
	bindLinks() {
		this.sectionsLinks = document.querySelectorAll('[data-link]');

		this.sectionsLinks.forEach(link => {
			link.addEventListener('click', () => {
				this.scrollTo(`${link.dataset.link}`);
			});
		});
	}
	_updateMaxScroll() {
		this.maxScrollTop =
			Math.max(
				document.body.scrollHeight,
				document.body.offsetHeight,
				document.documentElement.clientHeight,
				document.documentElement.scrollHeight,
				document.documentElement.offsetHeight
			) - window.innerHeight;
	}

	scrollTo(y, immediate = false) {
		if (typeof y !== 'number') {
			let targetElement;
			if (typeof y === 'string') {
				targetElement = document.querySelector(y);
			} else {
				targetElement = y;
			}

			y =
				targetElement.getBoundingClientRect().top + (window.pageYOffset || document.body.scrollTop);
		}

		y = y < 0 ? 0 : y;

		this._updateMaxScroll();

		y = y > this.maxScrollTop ? this.maxScrollTop : y;

		const distance = Math.abs(window.pageYOffset - y);
		let duration = distance / 500;
		duration = duration < 0.15 ? 0.15 : duration;
		duration = duration > 1 ? 1 : duration;

		if (immediate) {
			window.scrollTo(0, y);
		} else {
			this.autoScrolling = true;

			gsap.to(window, {
				scrollTo: { y: y, autoKill: false },
				duration: duration,
				ease: duration >= 0.5 ? 'power4.inOut' : '',
				onStart: () => {
					this.autoScrolling = true;
				},
				onComplete: () => {
					this.autoScrolling = false;
				},
				onAutoKill: () => {
					this.autoScrolling = false;
				},
			});
		}
	}
}

export default new PageScrolling();
