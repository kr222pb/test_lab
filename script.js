document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("startBtn");

    if (!button) return;

    button.addEventListener("click", function () {
        if (typeof DeviceMotionEvent.requestPermission === "function") {
            // Be om tillstånd först
            DeviceMotionEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === "granted") {
                        startGyro();
                    }
                });
        } else {
            startGyro();
        }
    });
});

function startGyro() {
    if ("Gyroscope" in window) {
        const sensor = new Gyroscope({ frequency: 60 });

        sensor.addEventListener("reading", () => {
            document.getElementById("x").textContent = sensor.x.toFixed(2);
            document.getElementById("y").textContent = sensor.y.toFixed(2);
            document.getElementById("z").textContent = sensor.z.toFixed(2);
        });

        sensor.start();
    }
}
