let watchId = null;
let updateCounter = 0;
let lastLat = null, lastLng = null;

// Haversine-formeln: Beräkna avstånd mellan två koordinater (i meter)
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371e3; // Jordens radie i meter
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lng2 - lng1) * (Math.PI / 180);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Avstånd i meter
}

// Starta realtidsspårning och räkna uppdateringar
function startTracking() {
    if ("geolocation" in navigator) {
        watchId = navigator.geolocation.watchPosition(position => {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            let accuracy = position.coords.accuracy;

            updateCounter++;
            document.getElementById("updateCount").textContent = updateCounter;
            document.getElementById("lat").textContent = lat.toFixed(6);
            document.getElementById("lng").textContent = lng.toFixed(6);

            let distanceMoved = lastLat !== null ? calculateDistance(lastLat, lastLng, lat, lng).toFixed(2) : "0";
            console.log(`Uppdatering #${updateCounter}: Lat: ${lat}, Long: ${lng}, Precision: ${accuracy.toFixed(2)}m, Flyttad: ${distanceMoved}m`);

            document.getElementById("status").textContent = `Spårning pågår... (Senast flyttad: ${distanceMoved} m)`;

            lastLat = lat;
            lastLng = lng;
        }, error => {
            alert("Kunde inte spåra position: " + error.message);
        }, { enableHighAccuracy: true });
    }
}

// Stoppa spårning
function stopTracking() {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        document.getElementById("status").textContent = "Spårning stoppad.";
        console.log("Spårning stoppad.");
    }
}
