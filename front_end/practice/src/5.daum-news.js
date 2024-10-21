import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

/**
 * [순서]

1. Daum뉴스탭의 URL을 분석한다.
2. 해당 URL에 Request를 보낸다.
3. Response를 분석한다
4. Parsing하여 문서 구조를 분석한다.
5. 해당하는 문서에 원하는 값들을 뽑아서 저장한다. (JSON으로 저장한다.)

가져올 데이터 (제목, 신문사, 요약설명, 날짜, URL)
*/

async function main(){
    const baseUrl = 'https://search.daum.net/search?w=news&nil_search=btn&DA=NTB&enc=utf8&cluster=y&cluster_page=1&q=%EA%B8%88%EC%9C%B5+%EC%84%9C%EB%B9%84%EC%8A%A4'
    let url = baseUrl;
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    const $contentTagArray = $('#dnsColl .c-list-basic > li');
    const result = $contentTagArray.map((i, el)=>{
        const press = $(el).find('.tit_item').prop('title');
        const title = $(el).find('.item-title').text();
        const desc = $(el).find('p.conts-desc.clamp-g2').text();
        const date = $(el).find('span.gem-subinfo').text();
        const url = $(el).find('.item-title a').prop('href');
        return {
            press, title, desc, date, url
        }
    }).get();
    console.log(result);
    fs.writeFile("daum-news.json", JSON.stringify(result), err=>{
        if(err){
            console.error(err);
        }
    })
}

main()