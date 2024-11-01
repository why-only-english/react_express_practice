const mongoose = require('mongoose');
const MONGO_HOST = 'mongodb+srv://admin:admin1234!!@cluster0.ngwqd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(MONGO_HOST, {
    retryWrites: true,
    w: "majority"
}).then(db=>{
    console.log("db connected");
    // console.log(db);
}).catch(err=>{
    console.error(err)
})

module.exports = mongoose;