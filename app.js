const currencyOne = document.querySelector('#currency-one');
const amountOne = document.querySelector('#amount-one');
const currencyTwo = document.querySelector('#currency-two');
const amountTwo = document.querySelector('#amount-two');

const rateElement = document.querySelector('#rate');
const swap = document.querySelector('#swap');

// Fetch exchange rates and update the DOM
function calculate() {
	const currency1 = currencyOne.value;
	const currency2 = currencyTwo.value;

	console.log(currency1, currency2);

	fetch(`https://api.exchangerate-api.com/v4/latest/${currency1}`)
		.then(res => res.json())
		.then(data => {
			//console.log(data);
			const rate = data.rates[currency2];

			rateElement.innerText = `1 ${currency1} = ${rate} ${currency2}`;

			amountTwo.value = (amountOne.value * rate).toFixed(2);
		});
}

// Event listener
currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);

swap.addEventListener('click', () => {
	const tempVal = currencyOne.value;
	currencyOne.value = currencyTwo.value;
	currencyTwo.value = tempVal;
	calculate();
});

calculate();
