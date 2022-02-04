const axios = require('axios').default; //using instead of import

const getCountriesData = async () => {
    try {
        // const response = await axios.get('https://restcountries.com/v2/all'); //get all the country info

        // requesting only country name, population and flag
        const response = await axios.get('https://restcountries.com/v2/all?fields=name,population,flag'); //just gets the country name, flag and population
        getCountryDetails(response.data);
    } catch (error) {
        // Handle Error Here
        console.error(error);
    }
};

getCountriesData();

//as defined in the axios page. -> async and await might have issues with older browsers

// axios.get("https://restcountries.com/v2/all")
//     .then(function (response) {
//         // console.log(response);
//         getCountryDetails(response.data);
//     })
//     .catch(function (error) {
//         console.log(error);
//     })
//     .then(function () {
//        console.log("hello");
//     });

const getCountryDetails = (country) => {
    for (let i = 0; i < country.length; i++) {

        //innerHTML

        const container = document.getElementById("container");
        container.innerHTML += `<div class="country"><h3>${country[i].name}</h3>` +
            `<span>Population: ${country[i].population}</span><br>` +
            `<img class="flag" src="${country[i].flag}" width="100px" heigh=auto></div>`;
    }
}
