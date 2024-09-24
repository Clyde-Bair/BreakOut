const header = new Uint8Array([66,77,118,56,0,0,0,0,0,0,54,0,0,0,40,0,0,0,80,0,0,0,60,0,0,0,1,0,24,0,0,0,0,0,64,56,0,0,212,53,0,0,212,53,0,0,0,0,0,0,0,0,0,0]);
async function generateImage(frame) {
    let data = new Uint8Array(14400);
    let binary = "";
    for (let i = 0; i < 54; i++) {
        binary += String.fromCharCode(header[i]);
    };
    let o = 0;
    for (let by = 0; by < sy; by++) {
        for (let bx = 0; bx < sx; bx++) {
            let rgb = pallete(frame[by].charAt(bx));
            for (let i = 0; i < 3; i++) {
                data[o + i] = rgb[i];
                binary += String.fromCharCode(data[o + i]);
            };
            o += 3;
        };
    };
    let base64 = window.btoa(binary);
    base64 = "url(\"data:image/bmp;base64\," + base64 + "\")";
    document.getElementById("curr").style.backgroundImage = base64;
    setTimeout(function(){document.getElementById("prev").style.backgroundImage = base64;},15);
};