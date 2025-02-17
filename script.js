let watchId = null;
let map, marker;

// Skapa karta vid första platsuppdatering
function initMap(lat, lng) {
    if (!map) {
        map = L.map('map').setView([lat, lng], 18); // Zooma mer för exakt visning
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        marker = L.marker([lat, lng]).addTo(map).bindPopup("Din plats").openPopup();
    } else {
        marker.setLatLng([lat, lng]);
        map.setView([lat, lng], 18);
    }
}

// Hämta enstaka position med precision
function getLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            let accuracy = position.coords.accuracy; // Mäter precision i meter

            document.getElementById("lat").textContent = lat.toFixed(6);
            document.getElementById("lng").textContent = lng.toFixed(6);
    

            initMap(lat, lng);
        }, error => {
            alert("Kunde inte hämta position: " + error.message);
        }, { enableHighAccuracy: true }); // Aktiverar mer exakt GPS
    } else {
        alert("Geolocation stöds inte av din webbläsare.");
    }
}
