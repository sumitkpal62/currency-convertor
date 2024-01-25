const BASE_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';
const dropdowns = document.querySelectorAll('.dropdown select');
const currFrom = document.querySelector('.from select');
const currTo = document.querySelector('.to select');
const btn = document.querySelector('button');
let msg = document.querySelector('.msg');


for (let select of dropdowns) {
    for (let country in countryList) {
        let newOption = document.createElement('option');
        newOption.value = country;
        newOption.innerText = country;
        if (select.name == 'from' && newOption.innerText == 'USD') {
            newOption.selected = true;
        }
        else if (select.name == 'to' && newOption.innerText == 'INR') {
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener('change', (evt) => {
        changeFlag(evt.target);
        exchangeCurrency();
    })
}

const changeFlag = (element) => {
    let countryCode = countryList[element.value];
    let parentEl = element.parentElement;
    let imgEl = parentEl.querySelector('img');
    imgEl.src = `https://flagsapi.com/${countryCode}/flat/64.png`
}

const exchangeCurrency = async () => {
    let amount = document.querySelector('.amount input');
    let amtValue = amount.value;
    let rate;
    if (amtValue == '' || amtValue < 1) {
        amount.value = 1;
        amtValue = 1;
    }


    let response = await fetch(`${BASE_URL}/${currFrom.value.toLowerCase()}/${currTo.value.toLowerCase()}.json`);
    let jsonResponse = await response.json();
    rate = jsonResponse[currTo.value.toLowerCase()];
    msg.innerText = `${amtValue} ${currFrom.value} = ${(amtValue * rate).toFixed(5)} ${currTo.value}`;

}

btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    exchangeCurrency();
})

window.addEventListener('load', exchangeCurrency)