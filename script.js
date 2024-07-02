document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const countryInfoContainer = document.getElementById('countryInfoContainer');
    const loader = document.getElementById('loader');

    let countriesData = [];

   
    loader.style.display = 'block';
    countryInfoContainer.style.display = 'none';

    
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            countriesData = data;
            displayCountries(countriesData);
            loader.style.display = 'none'; 
            countryInfoContainer.style.display = 'grid'; 
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
            loader.style.display = 'none'; 
        });

  
    function displayCountries(countries) {
        countryInfoContainer.innerHTML = ''; 
        countries.forEach((country, index) => {
            const countryInfo = document.createElement('div');
            countryInfo.className = 'country-info';
            countryInfo.style.animationDelay = `${index * 0.1}s`;
            
            const flagImg = document.createElement('img');
            flagImg.src = country.flags.svg;
            flagImg.alt = `${country.name.common} Flag`;
            
            const countryName = document.createElement('h2');
            countryName.textContent = country.name.common;
            
            const googleMapsLink = document.createElement('a');
            googleMapsLink.href = country.maps.googleMaps;
            googleMapsLink.target = '_blank';
            googleMapsLink.textContent = 'View on Google Maps';
            
            countryInfo.appendChild(flagImg);
            countryInfo.appendChild(countryName);
            countryInfo.appendChild(googleMapsLink);
            
            countryInfoContainer.appendChild(countryInfo);
        });
    }

   
    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredCountries = countriesData.filter(country => 
            country.name.common.toLowerCase().includes(searchTerm)
        );
        displayCountries(filteredCountries);
    });
});
