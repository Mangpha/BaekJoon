const fs = require("fs");
const input = fs.readFileSync("../input").toString().split("\n").slice(1);
let sol = input[0].split("");
let inputIdx = 1;
while (inputIdx < input.length) {
    input[inputIdx].split("").forEach((j, idx) => {
        if (sol[idx] === "?") return;
        if (j !== sol[idx]) {
            sol[idx] = "?";
            return;
        }
    });
    inputIdx++;
}
console.log(sol.join(""));
