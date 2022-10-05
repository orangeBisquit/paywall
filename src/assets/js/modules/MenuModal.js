class MenuModal {
	constructor() {
		this.menuOpenButtons = document.querySelectorAll('[data-menu-modal-open]');
		this.menuCloseButton = document.querySelector('[data-menu-modal-close]');
		this.menuModal = document.querySelector('[data-menu-modal]');
		this.menuModalLinks = document.querySelectorAll('[data-menu-modal-link]');
		this.menuModalAccordions = document.querySelectorAll('[data-menu-modal-accordion="element"]');

		this.init();
	}

	init = () => {
		this.menuCloseButton.addEventListener('click', this.menuCloseHandler);

		this.menuOpenButtons.forEach(button => {
			button.addEventListener('click', this.menuOpenHandler);
		});

		this.menuModalLinks.forEach(link => {
			link.addEventListener('click', this.linkClickHandler);
		});

		this.menuModalAccordions.forEach(accordion => {
			const toggleBtn = accordion.querySelector('[data-menu-modal-accordion="btn"]');
			toggleBtn.addEventListener('click', this.accodionToggleBtnHandler);
		});

		document.addEventListener('keydown', e => {
			if (e.key === 'Escape') {
				this.menuCloseHandler();
			}
		});
	};

	menuOpenHandler = () => {
		this.menuModal.classList.add('_active');

		gsap.fromTo(
			this.menuModal,
			{
				scale: 0.8,
				opacity: 0,
				duration: 0.7,
				ease: 'back.out(1.4)',
			},
			{
				scale: 1,
				opacity: 1,
				duration: 0.6,
				ease: 'back.out(1.4)',
			}
		);

		document.body.style.overflow = 'hidden';
	};

	menuCloseHandler = () => {
		gsap.fromTo(
			this.menuModal,
			{
				scale: 1,
				opacity: 1,
				duration: 0.6,
				ease: 'back.out(1.4)',
			},
			{
				scale: 0.8,
				opacity: 0,
				duration: 0.7,
				ease: 'back.out(1.4)',
				onComplete: () => {
					this.menuModal.classList.remove('_active');
				},
			}
		);

		document.body.style.overflow = 'auto';
	};

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
		const header = document.querySelector('.header');
		if (typeof y !== 'number') {
			let targetElement;
			if (typeof y === 'string') {
				targetElement = document.querySelector(y);
			} else {
				targetElement = y;
			}
			y =
				targetElement.getBoundingClientRect().top +
				(window.pageYOffset || document.body.scrollTop) -
				header.offsetHeight;
		}
		y = y < 0 ? 0 : y;
		this._updateMaxScroll();
		y = y > this.maxScrollTop ? this.maxScrollTop : y;
		const distance = Math.abs(window.pageYOffset - y);
		let duration = distance / 500;
		duration = duration < 0.15 ? 0.15 : duration;
		duration = duration > 1.2 ? 1.2 : duration;
		if (immediate) {
			window.scrollTo(0, y);
		} else {
			this.autoScrolling = true;
			gsap.to(window, {
				scrollTo: { y: y, autoKill: true },
				duration: duration,
				ease: 'none',
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

	scrollToBlockByHash(hash) {
		if (hash && hash.length) {
			try {
				const scrollToItem = document.querySelector(hash);
				if (scrollToItem) {
					this.scrollTo(scrollToItem);
				}
			} catch (e) {
				// Do nothing in case on invalid selector
			}
		}
	}

	linkClickHandler = e => {
		e.preventDefault();
		this.menuCloseHandler();
		this.scrollToBlockByHash(e.currentTarget.hash);
	};

	accodionToggleBtnHandler = e => {
		const accordion = e.target.closest('[data-menu-modal-accordion="element"]');
		accordion.classList.toggle('active');
	};
}

export default new MenuModal();
