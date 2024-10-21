const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("정수를 입력해주세요: ", function(input) {
    const number = parseInt(input); 

    for (let i = 0; i < number; i++) {
        console.log("안녕");
    }

    rl.close();
});
