class Mailing {
	constructor() {
		this.modalTrigger = document.querySelector('[data-mailing-modal-open]');
		this.modalOverlay = document.querySelector('[data-mailing-modal-overlay]');
		this.mailingModal = document.querySelector('[data-mailing-modal]');
		this.buttonClose = document.querySelector('[data-mailing-modal-close]');

		this.init();
	}

	init = () => {
		this.modalTrigger.addEventListener('click', this.modalOpenHandler);
		this.buttonClose.addEventListener('click', this.modalCloseHandler);

		document.addEventListener('keydown', e => {
			if (e.key === 'Escape') {
				this.modalCloseHandler();
			}
		});

		this.modalOverlay.addEventListener('click', e => {
			if (e.target === e.currentTarget) {
				this.modalCloseHandler();
			}
		});
	};

	modalOpenHandler = () => {
		this.mailingModal.classList.add('_open');
		gsap.from(this.modalOverlay, {
			opacity: 0,
			duration: 0.3,
		});
	};

	modalCloseHandler = () => {
		this.mailingModal.classList.remove('_open');
	};
}

export default new Mailing();
