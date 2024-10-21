import axios from "axios";
import * as cheerio from "cheerio";

const baseURL = "https://quotes.toscrape.com/";

async function scrapePage(url) {
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const quotes = [];

    $(".quote").each((i, elem) => {
      const quoteText = $(elem).find(".text").text().trim();
      const authorName = $(elem).find(".author").text().trim();
      const tags = $(elem)
        .find(".tags a.tag")
        .map((i, el) => $(el).text())
        .get();

      quotes.push({
        quote: quoteText,
        authorName: authorName,
        tags: tags,
      });
    });

    const nextPageLink = $(".next a").attr("href");

    return {
      quotes,
      nextPageLink: nextPageLink ? `${baseURL}${nextPageLink}` : null, // 다음 페이지가 있을 경우 URL 반환
    };
  } catch (error) {
    console.error(`Error fetching page: ${error}`);
    return { quotes: [], nextPageLink: null };
  }
}

async function scrapeAllPages() {
  let allQuotes = [];
  let nextPage = baseURL;

  while (nextPage) {
    const { quotes, nextPageLink } = await scrapePage(nextPage);
    allQuotes = allQuotes.concat(quotes);
    nextPage = nextPageLink;
  }

  // console.log(JSON.stringify(allQuotes, null, 2));
  console.log(allQuotes);
}

// 객체 저장 -> bi파일  
// 저장방식 차이 by OS

scrapeAllPages();
// nnnnnnnnnnnnnnnnnnnnnnnnnnnnn 