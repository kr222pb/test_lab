let watchId = null;
let startCounter = 0;
let stopCounter = 0;
let map, marker;

// Initiera kartan vid första platsuppdatering
function initMap(lat, lng) {
    if (!map) {
        map = L.map('map').setView([lat, lng], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        marker = L.marker([lat, lng]).addTo(map).bindPopup("Din plats").openPopup();
    } else {
        marker.setLatLng([lat, lng]);
        map.setView([lat, lng], 15);
    }
}

// Hämta enstaka position
function getLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            
            document.getElementById("lat").textContent = lat.toFixed(6);
            document.getElementById("lng").textContent = lng.toFixed(6);
            document.getElementById("status").textContent = "Senast hämtade position visas.";

            console.log("Hämtad position:", lat, lng);
            initMap(lat, lng); // Uppdatera kartan
        }, error => {
            alert("Kunde inte hämta position: " + error.message);
        });
    } else {
        alert("Geolocation stöds inte av din webbläsare.");
    }
}

// Starta spårning
function startTracking() {
    if ("geolocation" in navigator) {
        watchId = navigator.geolocation.watchPosition(position => {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;

            document.getElementById("lat").textContent = lat.toFixed(6);
            document.getElementById("lng").textContent = lng.toFixed(6);
            document.getElementById("status").textContent = "Spårning pågår...";

            console.log("Spårning pågår...", lat, lng);
            initMap(lat, lng); // Uppdatera kartan i realtid
        });

        startCounter++;
        document.getElementById("startCount").textContent = startCounter;
    } else {
        alert("Geolocation stöds inte av din webbläsare.");
    }
}

// Stoppa spårning
function stopTracking() {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        
        stopCounter++;
        document.getElementById("stopCount").textContent = stopCounter;
        document.getElementById("status").textContent = "Spårning stoppad.";

        console.log("Spårning stoppad.");
    }
}
