const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("정수를 입력해주세요: ", function(input) {
    const number = parseInt(input);

    for (let i = number; i > 0; i--) {
        let stars = "";
        for (let j = 0; j < i; j++) {
            stars += "*";
        }
        console.log(stars);
    }

    rl.close();
});
