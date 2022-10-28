const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
input.pop();
let idx = 0;
while (idx < input.length) {
    const target = input[idx];
    let c = true;
    for (let i = 0; i < Math.ceil(target.length / 2); i++) {
        if (target[i] !== target[target.length - 1 - i]) {
            console.log("no");
            c = false;
        }
        if (!c) break;
    }
    if (c) console.log("yes");
    idx++;
}
