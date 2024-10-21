const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askForNumber() {
    rl.question("100보다 큰 숫자를 입력하세요: ", function(input) {
        const number = parseInt(input);

        if (number > 100) {
            console.log("good! 입력한 숫자는 " + number + "입니다.");
            rl.close(); 
        } else {
            console.log("100보다 큰 숫자를 입력해야 합니다.");
            askForNumber();
        }
    });
}

askForNumber();
