import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

const ANIMATION_TO = {
	default: {
		duration: 0.5,
		opacity: 1,
		y: 0,
		x: 0,
		ease: 'power2.inOut',
		stagger: 0.12,
		scale: 1,
	},
	bounce: {
		duration: 0.5,
		opacity: 1,
		y: 0,
		x: 0,
		ease: 'elastic.easeOut',
		stagger: 0.12,
		scale: 1,
	},
};

const ANIMATION_FROM = {
	default: {
		delay: 0.55,
		scale: 0.8,
		opacity: 0,
		duration: 0.5,
		ease: 'back.out(1.4)',
		stagger: 0.09,
		y: 30,
	},
	twoSide: {
		x: gsap.utils.wrap([-100, 100]),
		y: 130,
		stagger: 0.08,
		delay: 0.6,
		scale: 0.8,
		opacity: 0,
		duration: 0.5,
		ease: 'back.out(1.4)',
	},
	scale: {
		scale: 0.4,
		ease: 'elastic.easeOut.congif(1, 0.3)',
		stagger: 0.9,
		duration: 0.9,
		delay: 0.9,
	},
	scaleDown: {
		duration: 0.2,
		scale: 1.4,
		ease: 'back.out(1.4)',
	},
};
class PageEffects {
	constructor() {
		this.autoShowElements = document.querySelectorAll('[data-auto-show]');
		this.animatingElements = [];
		this.defaultAnimations = [];
		this.bothSidesAnimations = [];
		this.scaleAnimations = [];
		this.scaleDownAnimations = [];

		this.init();
	}

	init = () => {
		this.handleAnimationOnLoad();
		this.handleAnimationOnScroll();
		this.handleIndividualAnnimations();
	};

	handleAnimationOnLoad = () => {
		document.addEventListener('DOMContentLoaded', () => {
			this.autoShowElements.forEach(element => {
				if (
					!element.hasAttribute('data-auto-hide') &&
					element.getAttribute('data-auto-show') !== 'scale'
				) {
					gsap.to(element, {
						duration: 0.01,
						opacity: 0,
					});
					element.setAttribute('data-auto-hide', '');
				}

				if (isInViewport(element)) {
					this.autoShowElements = Array.from(this.autoShowElements).filter(el => el !== element);

					this.animatingElements.push(element);
					element.removeAttribute('data-auto-show');
				}
			});
			gsap.fromTo(
				this.animatingElements,
				{
					delay: 0.55,
					scale: 0.8,
					opacity: 0,
					duration: 0.5,
					ease: 'back.out(1.4)',
					stagger: 0.09,
					y: 30,
				},
				ANIMATION_TO.default
			);
			this.animatingElements = [];
		});
	};

	handleAnimationOnScroll = () => {
		window.addEventListener('scroll', () => {
			this.autoShowElements.forEach(element => {
				if (isInViewport(element) && element.hasAttribute('data-auto-show')) {
					this.animatingElements.push(element);

					if (element.getAttribute('data-auto-show') === 'default') {
						this.defaultAnimations.push(element);
					}
					if (element.getAttribute('data-auto-show') === 'from-both-sides') {
						this.bothSidesAnimations.push(element);
					}
					if (element.getAttribute('data-auto-show') === 'scale') {
						this.scaleAnimations.push(element);
					}
					if (element.getAttribute('data-auto-show') === 'scale-down') {
						this.scaleDownAnimations.push(element);
					}

					element.removeAttribute('data-auto-show');
				}
			});

			if (this.scaleDownAnimations.length) {
				gsap.fromTo(this.scaleDownAnimations, ANIMATION_FROM.scaleDown, ANIMATION_TO.bounce);
				this.scaleDownAnimations = [];
			}
			if (this.defaultAnimations.length) {
				gsap.fromTo(this.defaultAnimations, ANIMATION_FROM.default, ANIMATION_TO.default);
				this.defaultAnimations = [];
			}
			if (this.bothSidesAnimations.length) {
				gsap.fromTo(this.bothSidesAnimations, ANIMATION_FROM.twoSide, ANIMATION_TO.default);
				this.bothSidesAnimations = [];
			}

			if (this.scaleAnimations.length) {
				const tl = gsap.timeline({ repeat: -1 });
				tl.to(this.scaleAnimations, {
					scale: 1.07,
					duration: 0.5,
					ease: 'elastic.easeOut',
					stagger: 0.05,
				});
				tl.to(this.scaleAnimations, {
					scale: 0.8,
					duration: 0.4,
					ease: 'elastic.easeOut',
					stagger: 0.05,
				});
				tl.to(this.scaleAnimations, {
					scale: 1.02,
					duration: 0.3,
					ease: 'elastic.easeOut',
					stagger: 0.05,
				});
				tl.to(this.scaleAnimations, {
					scale: 0.92,
					duration: 0.3,
					ease: 'elastic.easeOut',
					stagger: 0.05,
				});
				tl.to(this.scaleAnimations, {
					scale: 1,
					duration: 0.2,
					ease: 'elastic.easeOut',
					stagger: 0.05,
				});
				this.scaleAnimations = [];
			}
		});
	};

	handleIndividualAnnimations = () => {
		gsap.from('.footer__container', {
			scrollTrigger: '.footer__container',
			duration: 0.9,
			opacity: 0,
			y: 100,
			ease: 'back.out(1.4)',
		});
	};
}

export default new PageEffects();
