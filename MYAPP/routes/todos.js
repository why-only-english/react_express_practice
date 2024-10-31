const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// URL
// GET /todos
router.get('/', (req,res)=>{
    Todo.find().then(todos=>{
        res.json(todos);
    })
})
// POST /todos
router.post('/', (req, res)=>{
    const {text, color} = req.body;
    Todo.create({
        text,
        color
    }).then(data=>{
        res.json(data);
    })
})
// PUT /todos/:todoId
// DELETE / todos/:todoId

module.exports = router;