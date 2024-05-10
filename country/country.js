const Flag = document.querySelector('.left-section img')
const countryName = document.querySelector('.country-name')
const nativeName = document.querySelector('.native-name')
const Population = document.querySelector('.population')
const Region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const tld = document.querySelector('.tld')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountryContainer = document.querySelector('.border-country')
const title = document.querySelector('.title')
const darkMode = document.querySelector('.dark-mode')

const country = (new URLSearchParams(location.search).get('name'));

fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`).then((res) => res.json())
.then(([country]) => {
    // console.log(country);
    title.innerText = country.name.common
    Flag.src = country.flags.svg
    countryName.innerHTML = `<h2><b>${country.name.common}</b></h2>`
    nativeName.innerText = Object.values(country.name.nativeName)[0].official;
    Population.innerText = country.population.toLocaleString('en-IN')
    Region.innerText = country.region
    subRegion.innerText = country.subregion
    capital.innerText = country.capital
    tld.innerText = country.tld[0]
    currencies.innerText = Object.values(country.currencies)[0].name
    languages.innerText = Object.values(country.languages).join(', ')

    if(country.borders) {
        (Object.values(country.borders)).forEach((borders) => {
            console.log(borders)
            fetch(`https://restcountries.com/v3.1/alpha/${borders}`).then((res) => res.json())
            .then(([borderCountry]) => {
                const border = document.createElement('a');
                border.innerText = borderCountry.name.common;
                borderCountryContainer.append(border)
                border.href = `/country?name=${borderCountry.name.common}`
            })
        })
    }
})

darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark')
  })
