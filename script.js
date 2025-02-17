function init() {
    const button = document.querySelector("#startBtn");
    if (button) {
        button.addEventListener("click", requestPermission);
    } else {
        console.error("Knappen #startBtn hittades inte!");
    }
}

window.addEventListener("load", init);

function requestPermission() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    startGyro();
                } else {
                    alert("Tillstånd nekades. Gyroskop fungerar inte.");
                }
            })
            .catch(console.error);
    } else {
        startGyro();
    }
}

function startGyro() {
    if ("Gyroscope" in window) {
        try {
            let sensor = new Gyroscope({ frequency: 60 });

            sensor.addEventListener("reading", () => {
                let x = sensor.x.toFixed(2);
                let y = sensor.y.toFixed(2);
                let z = sensor.z.toFixed(2);

                document.getElementById("x").textContent = x;
                document.getElementById("y").textContent = y;
                document.getElementById("z").textContent = z;

                console.log(`X: ${x}, Y: ${y}, Z: ${z}`);
            });

            sensor.addEventListener("error", event => {
                console.error("Sensor error:", event.error.name);
                alert("Gyroskop API kunde inte startas. Prova en annan webbläsare eller aktivera sensorer i inställningar.");
            });

            sensor.start();
        } catch (error) {
            console.error("Gyroscope API kunde inte startas:", error);
            alert("Gyroskop API stöds men kunde inte startas. Kontrollera webbläsarinställningar.");
        }
    } else {
        alert("Gyroskop API stöds inte i denna webbläsare.");
    }
}


