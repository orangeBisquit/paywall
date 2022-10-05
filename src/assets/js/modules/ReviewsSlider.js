import Flickity from 'flickity';

class ReviewsSlider {
	constructor() {
		this.cardsList = document.querySelector('.reviews__list');
		this.cards = document.querySelectorAll('.reviews__item');
		this.arrowLeft = document.querySelector('[data-button-left]');
		this.arrowRight = document.querySelector('[data-button-right]');

		this.init();
	}

	init = () => {
		if (window.innerWidth < 768) {
			this.initMobileSlider();
		} else {
			this.initSlider();
		}

		let resizeTimer;
		window.addEventListener('resize', () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				if (window.innerWidth < 768) {
					this.initMobileSlider();
				} else {
					this.initSlider();
				}
			}, 250);
		});

		this.arrowLeft.addEventListener('click', () => {
			this.slider.previous();
		});
		this.arrowRight.addEventListener('click', () => {
			this.slider.next();
		});
	};

	initSlider = () => {
		this.slider && this.slider.destroy();
		this.slider = null;

		this.slider = new Flickity(this.cardsList, {
			wrapAround: true,
			autoPlay: 3500,
			freeScrollFriction: 0.075,
			friction: 0.28,
			selectedAttraction: 0.025,
			percentPosition: false,
			prevNextButtons: false,
			pageDots: false,
			freeScroll: true,
		});
	};

	initMobileSlider = () => {
		this.slider && this.slider.destroy();
		this.slider = null;

		this.slider = new Flickity(this.cardsList, {
			wrapAround: true,
			prevNextButtons: false,
			pageDots: false,
			dragThreshold: 30,
		});
	};
}

export default new ReviewsSlider();
