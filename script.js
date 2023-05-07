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
    countriesContainer.insertAdjacentHTML('beforeend', html)
    countriesContainer.style.opacity = 1

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
const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg)
}
const getData = function (url, msg = 'Something went Wrong ') {
    return fetch(url).then((response) => {
        if (!response.ok)
            throw new Error(msg)
        return response.json()
    })
}

function getCountryDatafromFetch(country) {
    getData('https://restcountries.com/v3.1/name/' + country, `Country not found !`)
        .then(data => {
            console.log(data)
            renderCountr(data[0])
            const neighbour = data[0].borders
            // const neighbour = 'hdedewq'
            console.log(neighbour)
            if (!neighbour) throw new Error(` No neighbour found !`);
            return getData(
                'https://restcountries.com/v3.1/alpha/' + neighbour,
                `Country not found !`)
        }).then(data =>
        renderCountr(data[0], 'neighbour'))
        .catch(err =>
            renderError(`Something went wrong : ${err.message} `))
        .finally(() => {
            countriesContainer.style.opacity = 1
        });


}

/*function getCountryDatafromFetch(country) {
    fetch('https://restcountries.com/v3.1/name/' + country)
        .then((response) => {
            if(!response.ok)
                throw new Error(`Country not found !`)
            return response.json()

        }).then(data => {
        console.log(data)
        renderCountr(data[0])
        // const neighbour = data[0].borders[0]
        const neighbour = 'hdedewq'
        if (!neighbour) return;
        return fetch('https://restcountries.com/v3.1/alpha/' + neighbour)
    }).then((response) => {
        if(!response.ok)
            throw new Error(`Country not found !`)
        return response.json()
    }).then(data =>
        renderCountr(data[0], 'neighbour'))
        .catch(err=>
        renderError(`Something went wrong : ${err.message} `))
        .finally(()=>{
            countriesContainer.style.opacity=1
        });


}*/

btn.addEventListener('click', () =>
    getCountryDatafromFetch('portugal'))
const whereAmI = function (lat, lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=580297292522578389719x62424 `)
        .then(res => {

            return res.json()
        })
        .then(data => {
            if (!data.succes)
                throw new Error(`Problem with the geocoding `)

            console.log(data)

        }).catch(err => console.error(err))
}
// whereAmI(52.588, 13.381)
// console.log('test start ');
// setTimeout(() => console.log('test timeout'), 0)
// Promise.resolve('resolve promis1').then(res => console.log(res))
// console.log('test2')

const promis = new Promise(function (resolve, reject) {
    console.log('Lottery draw is happening ')
    setTimeout(() => {
        if (Math.random() >= 0.5) {
            resolve('You Win ')
        } else reject(new Error('You Lose '))
    }, 2000)

})
//promis.then(data => console.log(data)).catch(err => console.error(err))
const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000)
    })
}
/*
wait(2).then(()=> {
    console.log('waiting for 2 seconds');
    return wait(1)
}).then(()=>console.log(' I waited for 1 second'))
*/

const whereAmIAsync = async (country)=>{
  const res =  await fetch('https://restcountries.com/v3.1/name/' + country)
 const jsonData= await res.json()
    console.log(jsonData)
    renderCountr(jsonData[0])
}
whereAmIAsync('portugal')
console.log('test ')
