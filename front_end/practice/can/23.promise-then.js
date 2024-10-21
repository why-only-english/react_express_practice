function fastFunction(data){
    return new Promise((resolve, reject)=>{
        setTimeout(function(){
            const result = data * 4;
            console.log("fastFunction done", result);
            resolve(result)
        }, 1000)
    })
}

function slowFunction(data){
    return new Promise((resolve, reject)=>{
        setTimeout(function(){
            const result = data + 10;
            console.log("slowFunction done", result);
            resolve(result)
        }, 3000)
    })
}

function normalFunction(data){
    return new Promise((resolve, reject)=>{
        setTimeout(function(){
            const result = data / 2;
            console.log("normalFunction done", result);
            resolve(result)
        }, 2000)
    })
}

// slowFunction -> normalFunction -> fastFunction
const initialData = 10
slowFunction(initialData).then(data=>{
    // resole
    console.log("then1:", data);
    return normalFunction(data)
}).then(data=>{
    console.log('then2',data)
    return fastFunction(data)
}).then(data=>{
    console.log('then3',data)
})



const promise1 = slowFunction(initialData).then(data=>{
    // resole
    console.log("then1:", data);
    return normalFunction(data)
})

promise1.then(data=>{
    console.log('then2:', data)
    return fastFunction(data)
}).then(data=>{
    console.log('then3:', data)
})


// (1) slow -> fast -> fast -> slow 결과  출력

// (2) 2초 후에 실행하는 normalFunction <data를 2로 나누는>을 만들고,
// slow -> noraml -> fast -> 결과 출력 (initialDate: 100)