import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

async function fetchNews(page) {
  const url = `https://m.search.naver.com/search.naver?where=m_news&sm=tab_jum&query=%EC%9D%B4%EC%B0%A8%EC%A0%84%EC%A7%80&start=${
    (page - 1) * 10 + 1
  }`;

  try {
    const res = await axios.get(url, {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "ko,en;q=0.9,en-US;q=0.8",
        "cache-control": "max-age=0",
        "sec-fetch-site": "same-origin",
        "upgrade-insecure-requests": "1",
      },
    });

    const $ = cheerio.load(res.data);
    const result = [];

    $(".news_wrap").each((i, el) => {
      const title = $(el).find(".news_tit").text().trim();
      const press = $(el).find(".press").text().trim();
      const summary = $(el).find(".news_dsc .dsc_txt_wrap").text().trim();
      const imgUrl = $(el).find(".dsc_thumb img").attr("src");

      result.push({
        title,
        press,
        summary,
        imgUrl: imgUrl ? imgUrl : "이미지 없음",
      });
    });

    return result;
  } catch (error) {
    console.error("에러 발생:", error);
    return [];
  }
}

async function main() {
  let allResults = [];
  let page = 1;

  while (allResults.length < 100) {
    const news = await fetchNews(page);
    allResults = allResults.concat(news);
    page++;

    if (news.length === 0) {
      break;
    }
  }

  allResults = allResults.slice(0, 100);

  console.log(allResults);

  fs.writeFile(
    "secondary-battery.json",
    JSON.stringify(allResults, null, 2),
    (err) => {
      if (err) {
        console.error("파일 저장 중 오류 발생:", err);
      } else {
        console.log("secondary-battery.json 파일에 저장되었습니다.");
      }
    }
  );
}

main();
