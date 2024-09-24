let ballAct = false;
let ballDir = 0;
let ballSpd = 0;
let ballX = 36;
let ballY = 48;
let level = 1;
let mapComplete = false;
function loadLevel() {
    switch (level) {
        case 1: blockSetData = mapD1; blockSetColor = mapC1; break;
        case 2: blockSetData = mapD2; blockSetColor = mapC2; break;
        case 3: blockSetData = mapD3; blockSetColor = mapC3; break;
        case 4: blockSetData = mapD4; blockSetColor = mapC4; break;
        case 5: blockSetData = mapD5; blockSetColor = mapC5; break;
        case 6: blockSetData = mapD6; blockSetColor = mapC6; break;
        case 7: blockSetData = mapD7; blockSetColor = mapC7; break;
        case 8: blockSetData = mapD8; blockSetColor = mapC8; break;
        default: gameComplete = true; break;
    };
    document.getElementById("level").innerHTML = "Level: " + level;
};
let blockSetData = [
    "000000",
    "111111",
    "111111",
    "111111",
    "111111",
    "111111",
    "111111",
    "000000",
    "000000"
];
let blockSetColor = [
    "RGBRGB",
    "BRGBRG",
    "GBRGBR",
    "RGBRGB",
    "BRGBRG",
    "GBRGBR",
    "RGBRGB",
    "BRGBRG",
    "GBRGBR"
];