// <!-- https://jsonplaceholder.typicode.com/users -->

// <!--
// baseUrl = https://jsonplaceholder.typicode.com/

// user리스트: /users
// 특정 user가 쓴 게시글 /users/<user_id>/posts
// 특정 user가 쓴 댓글 /users/<user_id>/comments
// 특정 user의 todo /users/<user_id>/todo
// -->

// <!--
// 1.function을 만들자

// 위 API만 이용해서
// username을 입력받아,

// - user의 정보
// - user가 쓴 게시글,
// - user가 쓴 댓글
// - user의 todo
// 를 모두 조회하는 함수를 작성
// --></user_id>

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function fetchUserData(username) {
  try {
    // 모든 사용자 정보를 가져옵니다.
    const usersResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    const usersData = await usersResponse.json();

    // 입력된 username과 정확하게 일치하는 사용자를 찾습니다.
    const user = usersData.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );

    if (!user) {
      console.log("사용자를 찾을 수 없습니다.");
      rl.close();
      return null;
    }

    // 사용자 ID를 저장합니다.
    const userId = user.id;

    // 사용자 정보 출력
    console.log("사용자 정보:", user);

    // 사용자가 작성한 게시글을 가져옵니다.
    const postsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`
    );
    const postsData = await postsResponse.json();
    console.log("사용자가 작성한 게시글:", postsData);

    // // 사용자가 작성한 댓글을 가져옵니다.
    // const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/comments`);
    // const commentsData = await commentsResponse.json();
    // console.log('사용자가 작성한 댓글:', commentsData);

    // // 사용자의 To-Do 리스트를 가져옵니다.
    // const todosResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
    // const todosData = await todosResponse.json();
    // console.log('사용자의 To-Do 리스트:', todosData);

    rl.close(); // 입력 인터페이스를 닫습니다.

    // 모든 데이터를 반환합니다.
    return { user, postsData };
  } catch (error) {
    console.error("Error fetching user data:", error);
    rl.close(); // 오류 발생 시에도 입력 인터페이스를 닫습니다.
  }
}

rl.question("사용자의 username을 입력하세요: ", (username) => {
  fetchUserData(username);
});
