const axios = require('axios').default

const getCountryDetails = async (country) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${country}`);
        console.log(response);
        showCountryDetails(response.data[0]);
        // if (response.data[0]) {
        //     showCountryDetails(response.data[0]);
        // } else {
        //     errorMessage();
        // }
    } catch (error) {
        console.error(error);
    }
}

const input = document.getElementById("search-term");
input.addEventListener("keyup", function(event) {
    if (event.key === 'Enter' ) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("search-button").click();
    }
});

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", () => {
    clearContent('country-details');
    const country = document.getElementById("search-term").value;
    if (country) {
        document.getElementById("search-term").value = "";
        getCountryDetails(country)
    } else {
        console.error("invalid search term");
        errorMessage();
    }
});

const clearContent = (elementID) => {

    for (let i = 1; i <= 10; i++) {
        document.getElementById(elementID).style.opacity = (10 - i) / 10;
    }
    document.getElementById(elementID).style.visibility = "hidden";
    document.getElementById(elementID).style.transition = "visibility 10s, opacity 1s ease-in-out";
    document.getElementById(elementID).innerHTML = "";
}

const errorMessage = () => {
    const countryDiv = document.getElementById("country-details");
    const errorText = document.createTextNode("Invalid Search Term. Try Again!");
    countryDiv.appendChild(errorText);
}

const showCountryDetails = (country) => {

    const currency = Object.getOwnPropertyNames(country.currencies)[0];
    const currencyName = Object.getOwnPropertyDescriptor(country.currencies, Object.getOwnPropertyNames(country.currencies)[0]).value;
    const language = Object.getOwnPropertyDescriptor(country.languages, Object.getOwnPropertyNames(country.languages)[0]).value;

    const countryDiv = document.getElementById("country-details");

    const node = document.createElement("DIV");
    node.className = "country-det-div";

    const imgNode = document.createElement("IMG");
    imgNode.src = `${country.flags.png}`;
    imgNode.alt = `${country.demonym} flag`;
    imgNode.width = 200;
    imgNode.style.display = "block";
    imgNode.style.marginLeft = "auto";
    imgNode.style.marginRight = "auto";
    imgNode.style.marginBottom = "20px";

    const divider = document.createElement("HR");

    const countryName = document.createElement("H4");
    const textNode = document.createTextNode(` ${country.name.official.toUpperCase()}`);
    countryName.appendChild(textNode);
    countryName.style.marginTop = "15px";
    countryName.style.textAlign = "center";

    const textNode2 = document.createTextNode(`${country.name.common} is situated in ${country.subregion}. It has a population of ${new Intl.NumberFormat().format(country.population)} people.`);
    const node2 = document.createElement("BR");
    const node3 = document.createElement("BR");
    const textNode3 = document.createTextNode(`The capital is ${country.capital[0]} and you can pay with ${currency}.`);
    const textNode4 = document.createTextNode(`They speak ${language}.`);

    node.appendChild(imgNode);
    node.appendChild(divider);
    node.appendChild(countryName);
    node.appendChild(textNode2);
    node.appendChild(node2);
    node.appendChild(textNode3);
    node.appendChild(node3);
    node.appendChild(textNode4);

    countryDiv.appendChild(node);
    countryDiv.style.visibility = "visible";
    countryDiv.style.opacity = 1;

    countryDiv.style.display = "block";

    // console.log(country.name.common);
    // console.log(country.population);
    // console.log(country.subregion);
    // console.log(Object.getOwnPropertyDescriptor(country.languages, Object.getOwnPropertyNames(country.languages)[0]).value);
    // console.log(Object.getOwnPropertyNames(country.currencies)[0]);
    // console.log(country.capital[0]);
}

