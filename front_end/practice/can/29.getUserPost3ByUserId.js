const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getUserPostByUserId(userId) {
  try {
    // 모든 사용자 정보를 가져옵니다.
    const usersResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    const usersData = await usersResponse.json();

    const user = usersData.find((u) => u.id === parseInt(userId));

    if (!user) {
      console.log("사용자를 찾을 수 없습니다.");
      rl.close();
      return null;
    }

    // 사용자가 작성한 게시글을 가져옵니다.
    const postsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${user.id}/posts`
    );
    const postsData = await postsResponse.json();

    // 게시글을 id 순서로 내림차순 정렬하여 최신 3개의 게시글을 선택합니다.
    const latest3Posts = postsData.sort((a, b) => b.id - a.id).slice(0, 3);

    console.log("사용자가 작성한 최신 3개의 게시글:", latest3Posts);

    rl.close();

    return { latest3Posts };
  } catch (error) {
    console.error("Error fetching user data:", error);
    rl.close();
  }
}

rl.question("사용자의 userId를 입력하세요: ", (userId) => {
  getUserPostByUserId(userId);
});
