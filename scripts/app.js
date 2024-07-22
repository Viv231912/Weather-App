const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')

//update UI
const updateUI = (data) => {
    const cityDetails = data.cityDetails;
    const weather = data.weather;

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `
    //remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }
}


//update city function, get city first, then weather 
const updateCity = async (city) => {
    //get city first
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return { cityDetails, weather }
}

cityForm.addEventListener('submit',  (e) => {
    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with the new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
})