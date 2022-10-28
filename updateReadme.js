const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

const folder = "./solved/";
const url = "https://www.acmicpc.net/problemset";
const probPage = {};
let md = `## BackJoon 

 BaekJoon Algorithm Study

 [Mangpha](https://www.acmicpc.net/user/mangpha)

## Solved

`;

const log = {
    info: (message) => console.log("\x1b[36m%s", message),
    error: (message) => console.log("\x1b[31m%s", message),
};

const readDir = () => {
    try {
        log.info("[#] Read Folder");
        const getPage = (num) => Math.floor((num - 1000) / 100) + 1;

        let count = 0;
        fs.readdirSync(folder).forEach((file) => {
            const filename = file.match(/^\d+/g).join("");
            const currentPage = getPage(filename);
            if (typeof probPage[currentPage] === "undefined") probPage[currentPage] = [];
            probPage[currentPage].push(filename);
            count++;
        });
        md += `| Total |
|:-----:|
| ${count} |
`;
        log.info("[#] Finish Reading");
    } catch (error) {
        log.error("[!] Type Error!");
        log.error(error);
    }
};

const fetchPage = async (page) => {
    try {
        log.info(`[#] Fetching Page ${page} Data`);
        const response = await axios.get(url + "/" + page);
        const $ = cheerio.load(response.data);
        const $table = $("#problemset").children("tbody");
        log.info("[#] Fetch Success");
        return $table;
    } catch (e) {
        log.error("[!] Fetching Error!");
        log.error(e);
    }
};

const getPageData = async () => {
    md += `
| 문제  | 문제 제목(링크) | 풀이 | 정답 비율 |
|:-------------:|:-------------:|:------:|:------:|
`;
    for (page in probPage) {
        const data = await fetchPage(page);
        probPage[page].forEach((prob) => {
            const tr = data.children(
                `tr:nth-child(${
                    page === 3 && prob > 1216
                        ? prob - (100 * (page - 1) + 1000)
                        : prob - (100 * (page - 1) + 1000) + 1
                })`,
            );
            const probId = tr.find("td:nth-child(1)").text();
            const title = tr.find("td:nth-child(2)").text();
            const probLink = tr.find("td:nth-child(2)").find("a").attr("href");
            const percentage = tr.find("td:nth-child(6)").text();
            md += `| ${probId} | [${title}](${
                url + probLink
            }) | [링크](https://github.com/Mangpha/BaekJoon/blob/master/solved/${probId}.js) | ${percentage} |
`;
        });
    }
};

const updateReadme = () => {
    log.info("[#] Write File..");
    fs.writeFileSync("./README.md", md);
    log.info("[#] Writing complete");
};

async function _init() {
    readDir();
    await getPageData();
    updateReadme();
}

_init();
