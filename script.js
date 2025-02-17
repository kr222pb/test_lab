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
    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", event => {
            let x = event.beta !== null ? event.beta.toFixed(2) : "N/A"; // X - Framåt/Bakåt
            let y = event.gamma !== null ? event.gamma.toFixed(2) : "N/A"; // Y - Vänster/Höger
            let z = event.alpha !== null ? event.alpha.toFixed(2) : "N/A"; // Z - Rotation (Kompass)

            document.getElementById("x").textContent = x;
            document.getElementById("y").textContent = y;
            document.getElementById("z").textContent = z;

            console.log(`X: ${x}, Y: ${y}, Z: ${z}`);
        });
    } else {
        alert("DeviceOrientation API stöds inte i denna webbläsare.");
    }
}

