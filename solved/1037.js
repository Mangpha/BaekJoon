const fs = require("fs");
const input = fs.readFileSync("../input").toString().split("\n");
const numbers = input[1].split(" ");
console.log(Math.max(...numbers) * Math.min(...numbers));
