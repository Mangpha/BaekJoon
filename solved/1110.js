const fs = require("fs");
const input = fs.readFileSync("../input").toString();
const cycle = (num) => num[1] + (parseInt(num[0]) + parseInt(num[1]) + "").slice(-1);
const end = input < 10 ? "0" + input : input;
let start = cycle(end);
let count = 1;
while (parseInt(end) !== parseInt(start)) {
    start = cycle(start);
    count++;
}

console.log(count);
