let gameStart = false;
let gameComplete = false;
let x = 28;
let y = 52;
function input(event) {
    let key = event.key;
    if (!gameStart) {
        gameStart = true;
        document.getElementById("level").innerHTML = "Level: 1";
    } else {
        if (key == 'a' || key == 'A') {
            x -= 2;
        };
        if (key == 'd' || key == 'D') {
            x += 2;
        };
        if (key == ' ') {
            if (!ballAct) {
                ballAct = true;
                ballDir = -1;
                ballSpd = 1;
            };
        };
        if (x < 4) {
            x = 4;
        };
        if (x > 56) {
            x = 56;
        };
        if (!ballAct) {
            ballX = x + 8;
            ballY = y - 4;
        };
    };
};