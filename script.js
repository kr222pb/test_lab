document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("startBtn");

    if (!button) return;

    button.addEventListener("click", function () {
        // Kolla om enheten kräver tillstånd (gäller iOS)
        if (typeof DeviceOrientationEvent.requestPermission === "function") {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === "granted") {
                        startOrientationSensor();
                    }
                })
                .catch(console.error);
        } else {
            // För Android och webbläsare som inte kräver tillstånd
            startOrientationSensor();
        }
    });
});

function startOrientationSensor() {
    if ("DeviceOrientationEvent" in window) {
        window.addEventListener("deviceorientation", event => {
            document.getElementById("x").textContent = event.beta !== null ? event.beta.toFixed(2) : "N/A"; // Framåt/Bakåt
            document.getElementById("y").textContent = event.gamma !== null ? event.gamma.toFixed(2) : "N/A"; // Vänster/Höger
            document.getElementById("z").textContent = event.alpha !== null ? event.alpha.toFixed(2) : "N/A"; // Rotation (kompass)
        });
    } else {
        alert("DeviceOrientation API stöds inte i denna webbläsare.");
    }
}

// function startGyro() {
//     if ("Gyroscope" in window) {
//         const sensor = new Gyroscope({ frequency: 60 });

//         sensor.addEventListener("reading", () => {
//             document.getElementById("x").textContent = sensor.x.toFixed(2);
//             document.getElementById("y").textContent = sensor.y.toFixed(2);
//             document.getElementById("z").textContent = sensor.z.toFixed(2);
//         });

//         sensor.start();
//     }
// }
