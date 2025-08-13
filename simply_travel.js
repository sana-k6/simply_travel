function showPlaces(event) {
    event.preventDefault();

    const searched = document.getElementById("place").value.trim().toLowerCase();

    fetch("./simply_travel.json")
        .then(response => response.json())
        .then(data => {
            const allCities = data.countries.flatMap(country => country.cities);

            // Filter cities based on search term
            const filteredCities = allCities.filter(city =>
                city.name.toLowerCase().includes(searched)
            );

            console.log(filteredCities);
        })
        .catch(error => console.error("Error fetching data:", error));
}
document.getElementById('searchForm').addEventListener('submit',showPlaces);