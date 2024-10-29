const express = require('express');
const router = express.Router();

const Board = require('../models/Board');


router.get('/', (req, res, next)=>{
    Board.find().then(boards=>{
        res.json(boards)
    }).catch(err=>{
        next(err)
    })
})

router.get('/:id', (req, res, next)=>{
    Board.findById(req.param.id).then(board=>{
        res.json(board);
    }).catch(err=>{
        next(err);
    })
});

router.post('/', (req, res, next)=>{
    console.log(req.body);
    Board.create(req.body).then(board=>{
        res.json(board)
    }).catch(err=>{
        next(err)
    })
})

module.exports = router;