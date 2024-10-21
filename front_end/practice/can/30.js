// fastFunction data*2 (1초)
// slowFunction data+10 (3초)
// initialData가 주어졌을 때, fastFunction -> slowFunction 
// slowFunction(fastFunction(initialData))

function fastFunction(data, callbackFn){
    return setTimeout(()=>{
        const result = data * 2
        console.log("fast", result);
        callbackFn(result)
    }, 1000)
}

function slowFunction(data, callbackFn){
    return setTimeout(()=>{
        const result = data + 10;
        console.log("slow", result);
        callbackFn(result);
    }, 10000)
}

// fastFunction -> slowFunction
fastFunction(10, (data)=>{
    const fastFunctionResult = data
    slowFunction(fastFunctionResult, data=>{
        const slowFunctionResult = data;
        console.log("fast->slow", slowFunctionResult);
    })
})