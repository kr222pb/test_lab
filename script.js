let map, marker;


// Hämta enstaka position
function getLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            document.getElementById("lat").textContent = lat.toFixed(6);
            document.getElementById("lng").textContent = lng.toFixed(6);
        });
    } else {
        alert("Geolocation stöds inte av din webbläsare.");
    }
}
