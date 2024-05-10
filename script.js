const countriesContainer = document.querySelector(".countries-container");
const filterRegion = document.querySelector(".filter-region");
const searchInput = document.querySelector(".search-input");
let allCountriesData;
const darkMode = document.querySelector('.dark-mode')

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    allCountriesData = data;
    renderData(data);
  })

filterRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) => res.json())
    .then(renderData)
});

function renderData(data) {
  countriesContainer.innerHTML = "";
      data.forEach((country) => {
        const countryCard = document.createElement("a");
        countryCard.classList.add("country-card");
        countryCard.href = `/country?name=${country.name.common}`;

        countryCard.innerHTML = `
        <img src="${country.flags.svg}">
                <div class="card-text">
                    <p class="country"><b>${country.name.common}</b></p>
                    <p><b>Population: </b>${country.population.toLocaleString("en-IN")}</p>
                    <p><b>Region: </b>${country.region}</p>
                    <p><b>Capital: </b>${country.capital}</p>
                </div>
                `;
        countriesContainer.append(countryCard);
      });
}


searchInput.addEventListener("input", (e) => {
  let input = e.target.value;
  console.log(input);

  let searchedCountry = allCountriesData.filter((countries) =>
    countries.name.common.toLowerCase().includes(input.toLowerCase())
  );
  console.log(searchedCountry);

  renderData(searchedCountry);
});

darkMode.addEventListener('click', () => {
  document.body.classList.toggle('dark')
})