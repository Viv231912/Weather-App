const cityForm = document.querySelector('form')

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
    .then(data => {
        console.log(data);
    }).catch(err => console.log(err));
})