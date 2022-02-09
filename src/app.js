const axios = require('axios').default; //using instead of import

const getCountriesData = async () => {
    try {
        // const response = await axios.get('https://restcountries.com/v2/all?fields=name,population,flag'); //just gets the country name, flag and population
        const response = await axios.get('https://restcountries.com/v2/all');
        // console.log(response.data);
        // console.log(response.data[0].name);

        sortBypopulation(response.data);
        getCountryDetails(response.data);
    } catch (error) {
        console.error(error);
    }
};

getCountriesData();

const sortBypopulation = (countries) => {
    countries.sort((a, b) => {
        return a.population - b.population;
    });
}

const getCountryDetails = (countries) => {
    const ul = document.getElementById("country-list");
    for (let i = 0; i < countries.length; i++) {
        const node = document.createElement("LI");
        const imgNode = document.createElement("IMG");
        imgNode.src = `${countries[i].flag}`;
        imgNode.alt = `${countries[i].demonym} flag`;
        const country = document.createElement("H4");
        const textNode = document.createTextNode(` ${countries[i].name.toUpperCase()}.`);
        country.appendChild(textNode);
        country.style.color = getColor(countries[i].region);
        const textNode2 = document.createTextNode(`Has a population of: ${countries[i].population} people.`);
        const node2 = document.createElement("BR");
        node.appendChild(imgNode);
        // node.appendChild(textNode);
        node.appendChild(country);
        node.appendChild(node2);
        node.appendChild(textNode2);
        node.style.display = 'inline-block';
        document.getElementById("country-list").appendChild(node);
    }
}

const colorRegion = {
    africa: 'blue',
    americas: 'mediumseagreen',
    asia: 'red',
    europe: 'orange',
    oceania: 'purple'
};

const getColor = (region) => {
    switch (region) {
        case "Africa": {
            return colorRegion.africa;
            break;
        }
        case "Asia": {
            return colorRegion.asia;
            break;
        }
        case "Europe": {
            return colorRegion.europe;
            break;
        }
        case "Oceania": {
            return colorRegion.oceania;
        }
        case "South America": {
            return colorRegion.americas;
            break;
        }
        default: return 'darkolivegreen';

    }
}
