const fs = require("fs");
const input = fs.readFileSync("../input").toString().trim().split("\n");
const [row, col] = input[0].split(" ");
const matrix = input.slice(1).map((el) => el.split(""));
let mR = 0,
    mC = 0;
for (let i = 0; i < row; i++) mR = matrix[i].includes("X") ? mR : mR + 1;
for (let i = 0; i < col; i++) {
    let c = false;
    for (let j = 0; j < row; j++) if (matrix[j][i] === "X") c = true;
    if (!c) mC++;
}
console.log(Math.max(mR, mC));
