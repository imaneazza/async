'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
/*const getCountryData = function (country){
    const request = new XMLHttpRequest();
    request.open('GET','https://restcountries.com/v3.1/name/'+country)
    request.send();
    request.addEventListener('load',function (){
        const [data] = JSON.parse(this.responseText)
        console.log(data);
        const html = `
    <article class="country">
          <img class="country__img" src="${data.flags['png']}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
            <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
          </div>
        </article>
`
        countriesContainer.style.opacity=1
        countriesContainer.insertAdjacentHTML('beforeend',html)
    })
}*/
const renderCountr = function (data, className = '') {
    const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flags['png']}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
            <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
          </div>
        </article>
`
    countriesContainer.style.opacity = 1
    countriesContainer.insertAdjacentHTML('beforeend', html)

}
const getCountryAndNeighbour = function (country) {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://restcountries.com/v3.1/name/' + country)
    request.send();
    request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText)
        console.log(data)
        renderCountr(data)
        const [neighbour] = data.borders
        if (!neighbour) return;
        const requestN = new XMLHttpRequest();
        requestN.open('GET', 'https://restcountries.com/v3.1/alpha/' + neighbour)
        requestN.send();
        requestN.addEventListener('load', function () {
            const [dataN] = JSON.parse(this.responseText)
            renderCountr(dataN, 'neighbour')

        })
    })
}

//getCountryAndNeighbour('usa')

function getCountryDatafromFetch(country) {
    fetch('https://restcountries.com/v3.1/name/' + country)
        .then((response) =>
            response.json()
        ).then(data => {
        renderCountr(data[0])
        const neighbour = data[0].borders[0]
        if (!neighbour) return;
        return fetch('https://restcountries.com/v3.1/alpha/' + neighbour)
    }).then((response) =>
        response.json()
    ).then(data =>
        renderCountr(data[0],'neighbour'));


}

getCountryDatafromFetch('portugal')