let gamepadIndex = null;

// Lyssna på när en gamepad ansluts
window.addEventListener("gamepadconnected", (event) => {
    gamepadIndex = event.gamepad.index;
    document.getElementById("status").textContent = `Gamepad ansluten: ${event.gamepad.id}`;
    updateGamepad();
});

// Lyssna på när en gamepad kopplas bort
window.addEventListener("gamepaddisconnected", () => {
    document.getElementById("status").textContent = "Gamepad frånkopplad.";
    document.getElementById("gamepadInfo").textContent = "Ingen gamepad upptäckt";
    gamepadIndex = null;
});

// Funktion som uppdaterar gamepad-data varje frame
function updateGamepad() {
    if (gamepadIndex === null) return; // Om ingen gamepad är ansluten, avsluta

    let gamepads = navigator.getGamepads();
    let gp = gamepads[gamepadIndex];

    if (gp) {
        let info = `ID: ${gp.id}\n\nKnappstatus:\n`;

        // Loopar genom alla knappar
        for (let i = 0; i < gp.buttons.length; i++) {
            info += `Knapp ${i}: ${gp.buttons[i].pressed ? "TRYCKT" : "Släppt"}\n`;
        }

        // Loopar genom alla axlar (joysticks)
        info += `\nJoystick (vänster): X=${gp.axes[0].toFixed(2)}, Y=${gp.axes[1].toFixed(2)}\n`;
        info += `Joystick (höger): X=${gp.axes[2].toFixed(2)}, Y=${gp.axes[3].toFixed(2)}\n`;

        document.getElementById("gamepadInfo").textContent = info;
    }

    requestAnimationFrame(updateGamepad); // Anropa funktionen igen nästa frame
}
