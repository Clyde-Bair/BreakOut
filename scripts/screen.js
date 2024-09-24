const sx = 80;
const sy = 60;
function frameStart() {
    if (gameStart) {
        if (!gameComplete) {
            if (!mapComplete) {
                let screen = [];
                generateScreen(screen);
            };
        } else {
            document.getElementById("level").innerHTML = "";
            document.getElementById("block").innerHTML = "";
            document.getElementById("prev").style.backgroundImage = "url(./images/ending.png)";
        };
    } else {
        document.getElementById("curr").style.backgroundImage = "url(./images/title.png)";
    };
};
function flipFrame(screen) {
    let frame = [];
    for (let i = 0; i < sy; i++) {
        frame[i] = "";
        frame[i] = screen[59 - i];
    };
    generateImage(frame);
};
function drawPixel(screen, x, y, char) {
    if (char != '@') {
        if (x >= 0 && x < sx) {
            if (y >= 0 && y < sy) {
                let newRow = "";
                for (let rx = 0; rx < sx; rx++) {
                    if (rx == x) {
                        newRow += char;
                    } else {
                        newRow += screen[y].charAt(rx);
                    };
                };
                screen[y] = newRow;
            };
        };
    };
};
function generateScreen(screen) {
    for (let y = 0; y < sy; y++) {
        screen[y] = "";
        for (let x = 0; x < sx; x++) {
            screen[y] += "1";
        };
    };
    drawBackground(screen);
    drawPaddel(screen);
    if (ballAct) {
        moveBall(screen);
    };
    drawBlocks(screen);
    countBlocks();
    //drawPixel(screen, x, y, '3'); // <<<<<<<<<<<<<<<<<<<<<< THE PLAYER PIXEL!!!!!!!!!!!
    flipFrame(screen);
};
function drawBackground(screen) {
    drawSprite(screen, borderTL, 0, 0);
    for (let i = 0; i < 18; i++) {
        drawSprite(screen, borderH, 4*(i+1), 0);
    };
    drawSprite(screen, borderTR, 76, 0);
    for (let j = 0; j < 14; j++) {
        drawSprite(screen, borderV, 0, 4*(j+1));
        for (let i = 0; i < 18; i++) {
            drawSprite(screen, background, 4*(i+1), 4*(j+1));
        };
        drawSprite(screen, borderV, 76, 4*(j+1));
    };
};
function drawSprite(screen, sprite, lx, ly) {
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            drawPixel(screen, lx+x, ly+y, sprite[y].charAt(x));
        };
    };
};
function moveBall(screen) {
    ballLost();
    ballHitPaddle();
    drawSprite(screen, ball, ballX, ballY);
    ballX += ballSpd;
    ballY += ballDir;
    if (ballX < 3 || ballX > 73) {
        if (ballX < 3) {
            ballX = 3;
        };
        if (ballX > 73) {
            ballX = 73;
        };
        ballSpd = -ballSpd;
    };
    if (ballY < 3 || ballY > 59) {
        if (ballY < 3) {
            ballY = 3;
        };
        if (ballY > 59) {
            ballY = 59;
        };
        ballDir = -ballDir;
    };
    ballHitBlock();
};
function ballHitBlock() {
    let blockFound = false;
    for (let by = 0; by < 2; by++) {
        for (let bx = 0; bx < 2; bx++) {
            for (let ty = 0; ty < 9; ty++) {
                if (ballY+1+by > (ty*4)+4 && ballY+1+by < (ty*4)+8) {
                    for (let tx = 0; tx < 72; tx+=12) {
                        if (ballX+1+bx > tx+4 && ballX+1+bx < tx+16) {
                            if (blockSetData[ty].charAt(tx/12) == '1') {
                                ballDir = -ballDir;
                                if (ballX+1+bx == tx+5 || ballX+1+bx == tx+15) {
                                    ballSpd = -ballSpd;
                                };
                                destroyBlock((tx/12), ty);
                                blockFound = true;
                                break;
                            };
                        };
                    };
                    if (blockFound) {
                        break;
                    };
                };
                if (blockFound) {
                    break;
                };
            };
            if (blockFound) {
                break;
            };
        };
        if (blockFound) {
            break;
        };
    };
};
function ballHitPaddle() {
    if (ballDir == 1) {
        if (ballY == 49) {
            if (ballX >= x-2 && ballX < x+19) {
                ballDir = -ballDir;
                if (ballX >= x-2 && ballX < x+1) {
                    ballSpd = -2;
                };
                if (ballX >= x+2 && ballX < x+7) {
                    ballSpd = -1;
                };
                if (ballX == x+8) {
                    ballSpd = 0;
                };
                if (ballX >= x+9 && ballX < x+14) {
                    ballSpd = 1;
                };
                if (ballX >= x+15 && ballX < x+19) {
                    ballSpd = 2;
                };
            };
        };
    };
};
function ballLost() {
    if (ballDir == 1) {
        if (ballY == 59) {
            ballDir = 0;
            ballSpd = 0;
            setTimeout(function() {ballAct = false;}, 1000);
        };
    };
};
function drawPaddel(screen) {
    drawSprite(screen, paddelA, x, y);
    for (let i = 0; i < 3; i++) {
        drawSprite(screen, paddelB, x+((i+1)*4), y);
    };
    drawSprite(screen, paddelC, x+16, y);
    if (!ballAct) {
        drawSprite(screen, ball, ballX, ballY);
    };
};
function countBlocks() {
    let count = 0;
    for (let by = 0; by < 9; by++) {
        for (let bx = 0; bx < 6; bx++) {
            if (blockSetData[by].charAt(bx) == '1') {
                count++;
            };
        };
    };
    document.getElementById("block").innerHTML = "Blocks Remaining: " + count;
    if (count == 0) {
        ballDir = 0;
        ballSpd = 0;
        mapComplete = true;
        setTimeout(function(){
            level++;
            loadLevel();
            resetValues();
        },2000);
    };
};
function destroyBlock(tx, ty) {
    let newData = "";
    for (let x = 0; x < 6; x++) {
        if (x == tx) {
            newData += "0"; 
        } else {
            newData += blockSetData[ty].charAt(x);
        };
    };
    blockSetData[ty] = newData;
};
function drawBlocks(screen) {
    for (let by = 0; by < 9; by++) {
        for (let bx = 0; bx < 6; bx++) {
            if (blockSetData[by].charAt(bx) == '1') {
                if (blockSetColor[by].charAt(bx) == 'R') {
                    drawSprite(screen, blockRedLeft, (bx*4)+4+(8*bx), (by*4)+4);
                    drawSprite(screen, blockRedMid, (bx*4)+8+(8*bx), (by*4)+4);
                    drawSprite(screen, blockRedRight, (bx*4)+12+(8*bx), (by*4)+4);
                } else if (blockSetColor[by].charAt(bx) == 'G') {
                    drawSprite(screen, blockGreenLeft, (bx*4)+4+(8*bx), (by*4)+4);
                    drawSprite(screen, blockGreenMid, (bx*4)+8+(8*bx), (by*4)+4);
                    drawSprite(screen, blockGreenRight, (bx*4)+12+(8*bx), (by*4)+4);
                } else if (blockSetColor[by].charAt(bx) == 'B') {
                    drawSprite(screen, blockBlueLeft, (bx*4)+4+(8*bx), (by*4)+4);
                    drawSprite(screen, blockBlueMid, (bx*4)+8+(8*bx), (by*4)+4);
                    drawSprite(screen, blockBlueRight, (bx*4)+12+(8*bx), (by*4)+4);
                };
            };
        };
    };
};
function resetValues() {
    x = 28;
    y = 52;
    ballAct = false;
    ballDir = 0;
    ballSpd = 0;
    ballX = 36;
    ballY = 48;
    mapComplete = false;
};
setInterval(function(){
    frameStart();
}, 30);