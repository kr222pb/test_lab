document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector("#startBtn");

    if (!button) {
        console.error("Knappen #startBtn hittades inte!");
        return;
    }

    button.addEventListener("click", requestPermission);
});

function requestPermission() {
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === "granted") {
                    startGyro();
                } else {
                    alert("Tillstånd nekades. Gyroskop fungerar inte.");
                }
            })
            .catch(error => {
                console.error("Fel vid tillståndsförfrågan:", error);
            });
    } else {
        startGyro(); // För enheter som inte kräver särskilt tillstånd
    }
}

function startGyro() {
    if ("DeviceOrientationEvent" in window) {
        window.addEventListener("deviceorientation", updateGyroData);
    } else {
        alert("DeviceOrientation API stöds inte i denna webbläsare.");
    }
}

function updateGyroData(event) {
    const x = event.beta !== null ? event.beta.toFixed(2) : "N/A"; // Framåt/Bakåt
    const y = event.gamma !== null ? event.gamma.toFixed(2) : "N/A"; // Vänster/Höger
    const z = event.alpha !== null ? event.alpha.toFixed(2) : "N/A"; // Rotation

    document.getElementById("x").textContent = x;
    document.getElementById("y").textContent = y;
    document.getElementById("z").textContent = z;

    console.log(`X: ${x}, Y: ${y}, Z: ${z}`);
}
