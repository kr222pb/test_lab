document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector("#startBtn");

    if (button) {
        button.addEventListener("click", requestPermission);
        console.log("Knappen hittad och eventlyssnare tillagd!");
    } else {
        console.error("❌ Knappen #startBtn hittades inte! Kontrollera att den finns i HTML.");
    }
});

function requestPermission() {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === "granted") {
                    startGyro();
                } else {
                    alert("Tillstånd nekades. Gyroskop fungerar inte.");
                }
            })
            .catch(console.error);
    } else {
        startGyro(); // Om det inte är iOS, starta direkt
    }
}

function startGyro() {
    if ("Gyroscope" in window) {
        let sensor = new Gyroscope({ frequency: 60 });

        sensor.addEventListener("reading", () => {
            document.getElementById("x").textContent = sensor.x.toFixed(2);
            document.getElementById("y").textContent = sensor.y.toFixed(2);
            document.getElementById("z").textContent = sensor.z.toFixed(2);

            console.log(`X: ${sensor.x}, Y: ${sensor.y}, Z: ${sensor.z}`);
        });

        sensor.start();
    } else {
        alert("Gyroskop API stöds inte i denna webbläsare.");
    }
}
