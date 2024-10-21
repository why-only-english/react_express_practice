const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getUserByUsername(username) {
  try {
    // 모든 사용자 정보를 가져옵니다.
    const usersResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    const usersData = await usersResponse.json();

    const user = usersData.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );

    if (!user) {
      console.log("사용자를 찾을 수 없습니다.");
      rl.close();
      return null;
    }

    const userId = user.id;

    console.log("사용자 정보:", user);

    rl.close(); 

    return { userId };
  } catch (error) {
    console.error("Error fetching user data:", error);
    rl.close();
  }
}

rl.question("사용자의 username을 입력하세요: ", (username) => {
  getUserByUsername(username);
});
