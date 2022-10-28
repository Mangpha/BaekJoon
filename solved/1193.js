const input = parseInt(require("fs").readFileSync("../input").toString().trim());
let l = 0,
    e = 0;
while (input > e) {
    l += 1;
    e += l;
}
const a = e - input;
console.log(l % 2 === 0 ? `${l - a}/${a + 1}` : `${a + 1}/${l - a}`);
