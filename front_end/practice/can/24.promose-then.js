function fastFunction(data){
    return new Promise((resolve, reject)=>{
        setTimeout(function(){
            const result = data * 2;
            console.log("fastFunction done", result);
            resolve(result);
        }, 1000);
    });
}

function slowFunction(data){
    return new Promise((resolve, reject)=>{
        setTimeout(function(){
            const result = data + 10;
            console.log("slowFunction done", result);
            resolve(result);
        }, 3000);
    });
}

function normalFunction(data){
    return new Promise((resolve, reject)=>{
        setTimeout(function(){
            const result = data / 2;
            console.log("normalFunction done", result);
            resolve(result);
        }, 2000);
    });
}

const initialData1 = 10;
slowFunction(initialData1)
    .then(data => {
        console.log("After slowFunction:", data);
        return fastFunction(data);
    })
    .then(data => {
        console.log("After first fastFunction:", data);
        return fastFunction(data);
    })
    .then(data => {
        console.log("After second fastFunction:", data);
        return slowFunction(data);
    })
    .then(data => {
        console.log("After second slowFunction:", data);
        console.log("Final Result:", data);
    })
    .catch(err => {
        console.error("Error:", err);
    });

const initialData2 = 100;
slowFunction(initialData2)
    .then(data => {
        console.log("After slowFunction:", data);
        return normalFunction(data);
    })
    .then(data => {
        console.log("After normalFunction:", data);
        return fastFunction(data);
    })
    .then(data => {
        console.log("After fastFunction:", data);
        console.log("Final Result:", data);
    })
    .catch(err => {
        console.error("Error:", err);
    });

// (1) slow -> fast -> fast -> slow 결과  출력

// (2) 2초 후에 실행하는 normalFunction <data를 2로 나누는>을 만들고,
// slow -> noraml -> fast -> 결과 출력 (initialDate: 100)