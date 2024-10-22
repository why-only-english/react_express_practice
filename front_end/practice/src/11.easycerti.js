import axios from "axios";
import fs from "fs";

// 리뷰 데이터를 가져오는 함수
async function fetchReviews(page) {
  const url = `https://www.jobplanet.co.kr/api/v4/companies/reviews/list?device=desktop&company_id=58388&page=${page}&year=2024,2023,2022&occupation_1=11600`;

  try {
    const res = await axios.get(url, {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "ko,en;q=0.9,en-US;q=0.8",
        "x-requested-with": "XMLHttpRequest",
      },
    });

    const result = [];

    // 응답 데이터에서 reviews 리스트 추출
    const reviews = res.data.data.reviews;

    reviews.forEach((review) => {
      const title = review.review_summary;
      const pros = review.pros;
      const cons = review.cons;
      const rating = review.star_score;

      result.push({
        title,
        pros,
        cons,
        rating: rating ? rating : "별점 없음",
      });
    });

    return result;
  } catch (error) {
    console.error("에러 발생:", error);
    return [];
  }
}

// 전체 리뷰 데이터를 수집하는 함수
async function main() {
  let allResults = [];
  let page = 1;

  // 100개 이상의 리뷰 수집을 위한 페이지 순회
  while (allResults.length < 100) {
    const reviews = await fetchReviews(page);
    allResults = allResults.concat(reviews);
    page++;

    // 더 이상 리뷰가 없으면 중단
    if (reviews.length === 0) {
      break;
    }
  }

  // 100개의 리뷰로 자르기
  allResults = allResults.slice(0, 100);

  // 결과를 파일로 저장
  fs.writeFile(
    "jobplanet-reviews.json",
    JSON.stringify(allResults, null, 2),
    (err) => {
      if (err) {
        console.error("파일 저장 중 오류 발생:", err);
      } else {
        console.log("jobplanet-reviews.json 파일에 저장되었습니다.");
      }
    }
  );
}

main();
