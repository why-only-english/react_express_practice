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

    const postsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`
    );
    const postsData = await postsResponse.json();
    console.log("사용자가 작성한 게시글:", postsData);

    rl.close();

    return { postsData };
  } catch (error) {
    console.error("Error fetching user data:", error);
    rl.close();
  }
}

rl.question("사용자의 userId를 입력하세요: ", (userId) => {
  getUserPostByUserId(userId);
});
