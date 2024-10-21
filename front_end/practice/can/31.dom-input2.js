// input tag에서 입력시 들어오는 값
/**
 * 사용자의 이름이 입력되면, (조회) 버튼이 클릭되었을 때
    - 3초 후 사용자의 정보를 가져와서 렌더링.
    - 3초가 지나기 전에는 '실행취소' 버튼이 생긴다.
    - '실행취소' 버튼이 클릭되면 가져오는 것이 취소된다.
    - const timer = setTimeout(fn, ms) => ms후에 fn 실행.
    - clearTimeout(timer)
 */

const searchBtn = document.getElementById('serach-name');
searchBtn.addEventListener('click', (event)=>{
    const usernameInput = document.getElementById('username');
    // 3초후 실행할 로직


})

async function getUserByUsername(username){
    const url = 'https://jsonplaceholder.typicode.com/users';
    const res = await fetch(url);
    const data = await res.json();

    const result = data.find((value)=>{
        return value.username === username;
    })
    console.log(result);
    return result;
}



async function getUserDataByUserId(userId, data){
    const enableData = ['posts', 'comments', 'todos']
    if (!['posts', 'comments', 'todos'].includes(data)){
        throw new Error(`${data} is not in ${enableData}`)
    }
    const url = `https://jsonplaceholder.typicode.com/users/${userId}/${data}`;
    const res = await fetch(url);
    const result = await res.json();
    console.log(result);
    return result;
}
async function getUserInfoByUsername(username){
    // 1. user 객체 가져오기
    // 2. id 조회하기
    // 3. getUserDataByUserId 호출 (posts, todos, comments 조회)
    const userObj = await getUserByUsername(username);
    const {id: userId} = userObj;
    const tasks = ['posts', 'comments', 'todos'].map(data=>{
        return getUserDataByUserId(userId, data)
    })

    const [posts, comments, todos] = await Promise.all(tasks);
    const result = {
        ...userObj,
        posts,
        comments,
        todos
    }
    console.log(result);
    return result;
}