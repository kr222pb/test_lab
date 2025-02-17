let watchId = null; // Variabel för att lagra watchPosition() ID

// Hämta enstaka plats (getCurrentPosition)
function getCurrentLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            document.getElementById("latitude").textContent = position.coords.latitude.toFixed(6);
            document.getElementById("longitude").textContent = position.coords.longitude.toFixed(6);
            document.getElementById("status").textContent = "Senast hämtade position visas.";
        }, error => {
            handleError(error);
        });
    } else {
        alert("Geolocation stöds inte av din webbläsare.");
    }
}

// Spåra användarens plats i realtid (watchPosition)
function startTracking() {
    if ("geolocation" in navigator) {
        watchId = navigator.geolocation.watchPosition(position => {
            document.getElementById("latitude").textContent = position.coords.latitude.toFixed(6);
            document.getElementById("longitude").textContent = position.coords.longitude.toFixed(6);
            document.getElementById("status").textContent = "Spårning pågår...";
        }, error => {
            handleError(error);
        });
    } else {
        alert("Geolocation stöds inte av din webbläsare.");
    }
}

// Stoppa spårning
function stopTracking() {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        document.getElementById("status").textContent = "Spårning stoppad.";
    }
}

// Hantera felmeddelanden
function handleError(error) {
    let message = "";
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "Du nekade åtkomst till platsdata.";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Platsdata är inte tillgänglig.";
            break;
        case error.TIMEOUT:
            message = "Begäran om plats tog för lång tid.";
            break;
        case error.UNKNOWN_ERROR:
            message = "Ett okänt fel inträffade.";
            break;
    }
    document.getElementById("status").textContent = `Fel: ${message}`;
}
