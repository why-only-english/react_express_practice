import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import iconv from "iconv-lite";

async function main() {
  const url = "https://service.wadiz.kr/api/search/funding";
  const reqBody = {
    categoryCode: "",
    endYn: "",
    limit: 500,
    order: "recommend",
    startNum: 0,
  };
  const res = await axios.post(url, JSON.stringify(reqBody), {
    headers: {
      accept: "*/*",
      "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/json",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      Referer: "https://www.wadiz.kr/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  });
  console.log(res.data.data.list);
  console.log(res.data.data.list.length);
}

main();
