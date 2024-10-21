// https://finance.naver.com/item/sise.nhn?code=005930
/**
 * Protocol: https = http + securtiy
 * Host(Domain): finance.naver.com
 * Path: /item/sise.nhn
 * Parameter(QueryString, ...): code=005930
 */

/**
 * https://finance.naver.com/item/sise.nhn?code=005930
 * -> /item/sise_day.naver?code=005930
 * ==> https://finance.naver.com/item/sise_day.naver?code=005930
 *
 * https://finance.naver.com/item/sise.nhn?code=005930
 * -> ?code=123123
 * ==>https://finance.naver.com/item/sise.nhn?code=123123
 *
 * https://finance.naver.com/item/sise.nhn?code=005930
 * -> https://www.naver.com
 * ==> https://www.naver.com
 *
 * https://finance.naver.com/item/sise.nhn?code=005930
 * -> day_info.nhn
 * ==> https://finance.naver.com/item/day_info.nhn
 */

// EUC-KR
import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import iconv from "iconv-lite";

async function main() {
  const baseUrl = "https://finance.naver.com/item/sise_day.naver?code=005930";
  const res = await axios.get(baseUrl, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    },
    responseType: "arraybuffer",
  });

  const data = iconv.decode(res.data, "euc-kr");
  const $ = cheerio.load(data);
  const $tableTag = $("table.type2");

  const $tableTrTag = $tableTag.find('tr[onmouseover="mouseOver(this)"]');
  const resultArr = $tableTrTag
    .map((i, el) => {
      const [date, close, ratioRaw, open, high, low, volume] = $(el)
        .children("td")
        .map((i, el) => {
          return $(el).text().trim();
        })
        .get();

      const ratioText = ratioRaw.includes("상승") ? "상승" : "하락";
      const ratioValue = ratioRaw.replace(/[^0-9]/g, "");
      const ratio = `${ratioText} ${ratioValue}`;

      return {
        date,
        close,
        ratio,
        open,
        high,
        low,
        volume,
      };
    })
    .get();

  console.log(resultArr);
}
main();
