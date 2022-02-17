const FND = require("./index").FND;
const segments = [0, 1, 2, 3, 4, 5, 6, 7];
const digits = [21, 20, 19, 18];
const fnd = new FND(segments, digits);

fnd.display(27.5, 2);
fnd.on();

global.fnd = fnd;
