const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send('Birds Home Page')
})

router.get('/about', (req, res)=>{
    res.send('About Birds')
})

router.get('/:birdId', (req, res, next)=>{
    if (req.params.birdId ==='hi'){
        next()
    } else{
        res.send(`Hi I am ${req.params.birdId} 새입니다.`)
    }
})

router.get('/hi', (req, res)=>{
    res.send("Hi I am bird");
});



module.exports = router;