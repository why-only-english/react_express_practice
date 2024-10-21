const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function fastFunction(data){
    await delay(1000);
    return data * 2;
}

async function slowFunction(data){
    await delay(3000);
    const result = data + 10;
    console.log("slowFunction Done");
    return result;
}

async function runTasks(){
    let result = await fastFunction(10).then(data=>{
        console.log("then1", )
        return data + 10000;
    });
    console.log("result1", result)
    result = await slowFunction(result);
    console.log("작업완료", result);
}

// const result = runTasks()
// console.log("runTask return", result);  

// normalFunction (2초 후 2로 나누는)을 async function 정의
// fast -> normal -> slow -> fast 결과 출력