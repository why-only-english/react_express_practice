const mongoose = require('../db');

const Cat = mongoose.model('Cat', {
    name: String
})

const kitty = new Cat({name: "야옹이"});
kitty.save().then(data=>{
    console.log("저장된 데이터")
    console.log(data);
})