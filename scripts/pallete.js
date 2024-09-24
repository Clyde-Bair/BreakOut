function testPallete(char) {
    switch (char) {
        case '0': return 51;
        case '2': return 102;
        case '4': return 153;
        case '6': return 204;
        case '8': return 255;
        default : return 0;
    };
};
function pallete(char) {
    switch (char) {
        case '0': return [0,0,0]; /*Black*/
        case '1': return [255,255,255]; /*White*/
        case '2': return [128,128,128]; /*Gray*/
        case '3': return [0,16,172]; /*Red*/
        case '4': return [0,56,252]; /*Lite Red*/
        case '5': return [0,120,0]; /*Green*/
        case '6': return [0,184,0]; /*Lite Green*/
        case '7': return [252,0,0]; /*Blue*/
        case '8': return [252,120,0]; /*Lite Blue*/
        case '9': return [88,64,0]; /*Background*/
        default : return [0,0,0]; /*Invalid Value*/
    };
};