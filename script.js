document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("startBtn");
    const box = document.getElementById("box");

    if (!button) return;

    button.addEventListener("click", function () {
        if (typeof DeviceOrientationEvent.requestPermission === "function") {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === "granted") {
                        startOrientationSensor();
                    }
                })
                .catch(console.error);
        } else {
            startOrientationSensor();
        }
    });

    function startOrientationSensor() {
        if ("DeviceOrientationEvent" in window) {
            window.addEventListener("deviceorientation", event => {
                const x = event.beta !== null ? event.beta.toFixed(2) : "N/A"; // Framåt/Bakåt
                const y = event.gamma !== null ? event.gamma.toFixed(2) : "N/A"; // Vänster/Höger
                const z = event.alpha !== null ? event.alpha.toFixed(2) : "N/A"; // Rotation (kompass)

                document.getElementById("x").textContent = x;
                document.getElementById("y").textContent = y;
                document.getElementById("z").textContent = z;

                // Rotera boxen baserat på gamma (Y) och beta (X)
                box.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
            });
        } else {
            alert("DeviceOrientation API stöds inte i denna webbläsare.");
        }
    }
});


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
