import * as noUiSlider from 'nouislider';

class Calculator {
	constructor() {
		this.container = document.querySelector('[data-calculator]');

		this.commission = 0.8;
		this.currencyChangeMultiplier = 0.04; // 50 руб === 1.99

		this.init();
	}

	init = () => {
		if (this.container) {
			this.currencyButtons = this.container.querySelectorAll('[data-calculator-currency]');
			this.currencyName = this.container.querySelector('[data-calculator-currency-name]');
			this.resultCurrencyName = this.container.querySelector('[data-calculator-result-currency]');

			this.subsRange = this.container.querySelector('[data-calculator-subs-range]');
			this.priceRange = this.container.querySelector('[data-calculator-price-range]');

			this.subsValueNode = this.container.querySelector('[data-calculator-subs-label]');
			this.priceValueNode = this.container.querySelector('[data-calculator-price-label]');

			this.revenueMinNode = this.container.querySelector('[data-calculator-revenue-min]');
			this.revenueMaxNode = this.container.querySelector('[data-calculator-revenue-max]');

			this.initDefaultValues();
			this.initSubsRange();
			this.initPriceRange();
			this.bindCurrencyChangeHandlers();
		}
	};

	initDefaultValues = () => {
		this.subValue = 10000;
		this.priceValue = 500;
		this.priceSliderValue = 500;
		this.currency = 'руб.';
	};

	bindCurrencyChangeHandlers = () => {
		this.currencyButtons.forEach(button => {
			button.addEventListener('click', e => {
				e.preventDefault();

				this.currencyButtons.forEach(item => {
					item.classList.remove('_active');
				});

				if (button.dataset.currency !== this.currency) {
					this.currency = button.dataset.calculatorCurrency;
					this.currencyName.textContent = this.currency;
					if (this.currency === 'руб.') {
						this.resultCurrencyName.textContent = '₽';
					} else {
						this.resultCurrencyName.textContent = this.currency;
					}
					button.classList.add('_active');
					this.initCurrencyChange();
				}
			});
		});
	};

	initCurrencyChange = () => {
		this.setSubsValue();
		this.setPriceValue();
		this.calculateRevenue();
	};

	calculateRevenue = () => {
		const minRevenue = this.subValue * 0.005 * this.priceValue * this.commission;
		const maxRevenue = this.subValue * 0.03 * this.priceValue * this.commission;

		let format = 'ru-RU';
		if (this.currency !== 'руб.') {
			format = 'en-US';
		}

		this.revenueMinNode.textContent = new Intl.NumberFormat(format).format(minRevenue.toFixed(2));
		this.revenueMaxNode.textContent = new Intl.NumberFormat(format).format(maxRevenue.toFixed(2));
	};

	initSubsRange = () => {
		this.subsSlider = noUiSlider.create(this.subsRange, {
			start: 10000,
			tooltips: true,
			connect: 'lower',
			format: {
				to: value => Math.round(value),
				from: value => Math.round(value),
			},
			range: {
				min: [500, 500],
				'3.7%': [1000, 1000],
				'30%': [10000, 10000],
				'50%': [100000, 100000],
				max: [1000000],
			},
		});

		this.subsSlider.on('slide', () => {
			this.subValue = this.subsSlider.get();
			this.setSubsValue();
			this.calculateRevenue();
		});
	};

	setSubsValue = () => {
		this.subsValueNode.textContent = this.subValue;
	};

	initPriceRange = () => {
		this.priceSlider = noUiSlider.create(this.priceRange, {
			start: 500,
			tooltips: true,
			connect: 'lower',
			format: {
				to: value => Math.round(value),
				from: value => Math.round(value),
			},
			step: 50,
			range: {
				min: [50],
				max: [15000],
			},
		});

		this.priceSlider.on('slide', () => {
			this.priceSliderValue = this.priceSlider.get();
			this.priceValue = this.priceSlider.get();
			this.setPriceValue();
			this.calculateRevenue();
		});
	};

	setPriceValue = () => {
		this.priceValue = this.priceSliderValue;
		if (this.currency !== 'руб.') {
			this.priceValue = this.priceValue * this.currencyChangeMultiplier;
			this.priceValue = Math.round(this.priceValue * 100) / 100;
		}

		this.priceValueNode.textContent = this.priceValue;
	};
}

export default new Calculator();
