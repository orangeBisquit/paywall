const slidesAnimationsTime = [6500, 26000, 43500, 47500, 6500];
// const slidesAnimationsTime = [3000, 3000, 3000, 3000, 3000];
class VideoAnimations {
	constructor() {
		this.scenes = document.querySelectorAll('[data-video-scene]');
		this.baseSlideHeight = this.scenes[0].clientHeight;
		this.mobilePlayButton = document.querySelector('.animations__video-btn');
		this.frame = document.querySelector('.animations__frame');
		this.video = document.querySelector('.animations__video-frame-mockup');
		this.videoWrapper = document.querySelector('.animations__video');
		this.maxHeight = 0;

		this.init();
	}

	init() {
		this.setMinHeight();

		this.video.addEventListener('loadeddata', () => {
			if (this.video.readyState >= 2) {
				this.video.play();
				this.initLoop();
			}
		});

		window.addEventListener('resize', this.resetMinHeight);

		this.mobilePlayButton.addEventListener('click', () => {
			// open this.video in fullscreen mode
			this.videoWrapper.style.display = 'block';
			this.videoWrapper.style.opacity = 0;
			if (this.video.requestFullscreen) {
				this.video.requestFullscreen();
				this.videoWrapper.style.opacity = 1;
			} else if (this.video.webkitRequestFullscreen) {
				this.video.webkitRequestFullscreen();
				this.videoWrapper.style.opacity = 1;
			} else if (this.video.msRequestFullscreen) {
				this.video.msRequestFullscreen();
				this.videoWrapper.style.opacity = 1;
			}
			this.video.play();

			setTimeout(() => {
				this.videoInFullScreen = true;
			}, 100);
		});

		document.addEventListener('fullscreenchange', this.exitHandler, false);
		document.addEventListener('mozfullscreenchange', this.exitHandler, false);
		document.addEventListener('MSFullscreenChange', this.exitHandler, false);
		document.addEventListener('webkitfullscreenchange', this.exitHandler, false);
	}

	exitHandler = () => {
		if (this.videoInFullScreen) {
			this.videoWrapper.style.display = 'none';
			this.videoInFullScreen = false;
		}
	};

	setMinHeight = () => {
		this.scenes.forEach(item => {
			if (item.clientHeight > this.maxHeight) {
				this.maxHeight = item.clientHeight;
				item.classList.remove('_temp');
			}

			item.classList.remove('_temp');
		});

		this.scenes.forEach(item => {
			item.style.height = `${this.maxHeight}px`;
		});
	};

	resetMinHeight = () => {
		this.scenes.forEach(item => {
			item.classList.add('_temp');
			item.style.height = 'auto';
		});
		this.maxHeight = 0;
		this.setMinHeight();
	};

	initLoop = () => {
		let i = 0;

		if (window.innerWidth > 767) {
			const loop = () => {
				setTimeout(() => {
					gsap.to(this.scenes[i], {
						duration: 0.2,
						opacity: 0,
						ease: 'back.out(0.1)',
					});

					setTimeout(() => {
						this.scenes[i].classList.remove('_active');
						i++;
						if (i === this.scenes.length) {
							i = 0;
						}
						this.scenes[i].classList.add('_active');

						gsap.to(this.frame, {
							duration: 0.7,
							ease: 'power2.inOut',
						});

						setTimeout(() => {
							gsap.to(this.scenes[i], {
								duration: 0.5,
								opacity: 1,
								ease: 'power2.inOut',
								onComplete: () => {
									loop();
								},
							});
						}, 200);
					}, 100);
				}, slidesAnimationsTime[i]);
			};

			loop();
		}
	};
}

export default new VideoAnimations();
