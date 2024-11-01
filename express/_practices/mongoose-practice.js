const mongoose = require('../db');

// 스키마 구성.
const Cat = mongoose.model('Cat', {
    name: String
})

// 객체 만들기
const kitty = new Cat({name: "야옹이"});

// 저장. kitty.save() Promise객체
kitty.save().then(data=>{
    console.log("저장된 데이터")
    console.log(data);
})