/**
<!-- 
baseUrl = https://jsonplaceholder.typicode.com/
user리스트: /users
특정 user가 쓴 게시글 /users/<user_id>/posts
특정 user가 쓴 댓글 /users/<user_id>/comments
특정 user의 todo /users/<user_id>/todos
-->
<!-- 
여기서 function은 async function도 무방함.

1. function getUserByUsername(username) 함수 정의
    - /users에 fetch 
        - <fetch('https://jsonplaceholder.typicode.com/users')
    - 데이터를 받아서 입력받은 username과 같은 user object를 출력

2. function getUserPostByUserId(userId) 함수 정의
    - /users/${userId}/posts에 fetch
    - 데이터를 받아서 해당하는 post(배열) 출력

3. function getUserInfoByUsername(username) 함수 정의
    - username을 받아서 user의 posts, 
        comments, todo, user object모두 출력
 -->
 */

 /**
  * 1. function getUserByUsername(username) 함수 정의
    - /users에 fetch 
        - <fetch('https://jsonplaceholder.typicode.com/users')
    - 데이터를 받아서 입력받은 username과 같은 user object를 출력
  */

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
    
    function getUserByUsername2(username){
        const url = 'https://jsonplaceholder.typicode.com/users';
        return fetch(url).then(res=>{
            return res.json()
        }).then(data=>{
            const result = data.find((value)=>{
                return value.username === username;
            })
            console.log(result);
            return result;
        })
    }
    
    /**
     * 2. function getUserPostByUserId(userId) 함수 정의
        - /users/${userId}/posts에 fetch
        - 데이터를 받아서 해당하는 post(배열) 출력
     */
    
    
    // 조회한 유저의 정보를 html내에서 렌더링
    // - user의 id
    // - user의 name
    // - comment의 개수
    // - post의 개수
    // - todo의 개수
    
    // 2. function getUserPostByUserId(userId) 함수 정의
    //     - /users/${userId}/posts에 fetch
    //     - 데이터를 받아서 해당하는 post(배열) 출력
    async function getUserPostByUserId(userId){
        const url = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        return data;
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
    
    // 3. function getUserInfoByUsername(username) 함수 정의
    //     - username을 받아서 user의 posts, 
    //         comments, todo, user object모두 출력
    async function getUserInfoByUsername(username){
        // 1. user 객체 가져오기
        // 2. id 조회하기
        // 3. getUserDataByUserId 호출 (posts, todos, comments 조회)
        const userObj = await getUserByUsername(username);
        const {id: userId} = userObj;
        
        // posts => todos => comments
        // getUserDataByUserId(userId, 'posts').then(data=>{
        //     return getUserDataByUserId(userId, 'todos')
        // }).then(data=>{
        //     return getUserDataByUserId(userId, 'comments')
        // })
    
        const tasks = ['posts', 'comments', 'todos'].map(data=>{
            return getUserDataByUserId(userId, data)
        })
        // posts  ==>
        // todos  ==>    [posts, comments, todos]
        // comments ==>
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
    
    const username = prompt("유저 정보 입력 (Bret)")
    getUserInfoByUsername(username).then(userInfo=>{
        const rootElem = document.getElementById('root')
        const {id, name, comments, posts, todos} = userInfo;
    
        rootElem.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>이름</th>
                        <th>Comments</th>
                        <th>Todos</th>
                        <th>Posts</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${id}</td>
                        <td>${name}</td>
                        <td>${comments.length}</td>
                        <td>${todos.length}</td>
                        <td>${posts.length}</td>
                    </tr>
                </tbody>
            </table>
        `
    })
    
    
    // const rootElem = document.getElementById('root');
    // const rootElem2 = document.querySelector('#root');
    
    // rootElem.innerHTML = "<렌더링 할 내용>"
    // // root에 반영됩니다.