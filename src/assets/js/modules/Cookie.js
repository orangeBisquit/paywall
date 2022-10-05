import Cookies from 'js-cookie';

const ACTIVE_CLASS = '_active';
const COOKIE_NAME = 'cookies-info-shown';

function getDomain(url, subdomain) {
	subdomain = subdomain || false;

	url = url.replace(/(https?:\/\/)?(www.)?/i, '');

	if (!subdomain) {
		url = url.split('.');

		url = url.slice(url.length - 2).join('.');
	}

	if (url.indexOf('/') !== -1) {
		return url.split('/')[0];
	}

	return url;
}

class Cookie {
	constructor() {
		this.cookieMessage = document.querySelector('.cookie');
		this.cookieButton = this.cookieMessage.querySelector('.cookie__button-thanks');

		this.init();
	}

	init = () => {
		if (Cookies.get(COOKIE_NAME) !== '1') {
			this._setCookie();
		}
	};

	_setCookie = () => {
		this.cookieMessage.classList.add(ACTIVE_CLASS);

		this.cookieButton.addEventListener('click', this._accept);
	};

	_accept = () => {
		const domain = '.' + getDomain(window.location.href);
		Cookies.set(COOKIE_NAME, '1', { expires: 365 });

		gsap.to(this.cookieMessage, {
			scale: 0,
			opacity: 0,
			duration: 0.2,
			onComplete: () => {
				this.cookieMessage.classList.remove(ACTIVE_CLASS);
			},
		});

		this.cookieButton.removeEventListener('click', this._accept);
	};
}

export default new Cookie();
