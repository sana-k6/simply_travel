function fetchData(searchTerm) {
    fetch("./simply_travel.json")
        .then(response => response.json())
        .then(data => {
            let results=[];
            searchTerm=searchTerm.trim().toLowerCase();
            if (searchTerm === "beach" || searchTerm === "beaches") {
                results = data.beaches; // Show all beaches
            } 
            else if (searchTerm === "temple" || searchTerm === "temples") {
                results = data.temples; // Show all temples
            }
            else if (searchTerm === "country" || searchTerm === "countries") {
                results = data.temples;
                for (let i = 0; i < data.countries.length; i++) {
                    const country = data.countries[i];
                    for (let j = 0; j < country.cities.length; j++) {
                        results.push(country.cities[j]);
                    }
                } 
            }
            else 
            {
                // Country search
                const matchingCountry = data.countries.find(country =>
                    country.name.toLowerCase() === searchTerm
                );

                if (matchingCountry) {
                    // If country matches, return all its cities
                    results = matchingCountry.cities;
                } else {
                    let allCities = [];
                    for (let i = 0; i < data.countries.length; i++) {
                        const country = data.countries[i];
                        for (let j = 0; j < country.cities.length; j++) {
                            allCities.push(country.cities[j]);
                        }
                    }

                    // Merge all places
                    let allPlaces = allCities.concat(data.temples, data.beaches);

                    // Filter by name
                    results = allPlaces.filter(place =>
                        place.name.toLowerCase().includes(searchTerm)
                    );
                }
            }
            displayResults(results);
        })
        .catch(error => console.error("Error fetching data:", error));
}
document.getElementById('searchForm').addEventListener('submit',function(event){
    event.preventDefault();

    const searchTerm = document.getElementById("place").value;
    fetchData(searchTerm);
});
function displayResults(results) {
    // Remove old results
    let resultsContainer = document.getElementById("results");
    if (!resultsContainer) {
        resultsContainer = document.createElement("div");
        resultsContainer.id = "results";
        document.body.appendChild(resultsContainer);
    }
    resultsContainer.innerHTML = "";

    if (results.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

    // Display each result
    results.forEach(place => {
        const placeCard = document.createElement("div");
        placeCard.classList.add("place");
        placeCard.innerHTML = `
            <h3>${place.name}</h3>
            <img src="${place.imageUrl}" alt="${place.name}" width="200">
            <p>${place.description}</p>
            <hr>
        `;
        resultsContainer.appendChild(placeCard);
    });
}