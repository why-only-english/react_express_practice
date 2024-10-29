const mongoose = require('../db');

const Cat = mongoose.model('Cat', {
    name: String
})

Cat.insertMany([
    {name: "나비"},
    {name: "부엉이"}
]).then(data=>{
    console.log("data 저장 완료", data);
});