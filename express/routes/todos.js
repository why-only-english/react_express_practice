const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const {authenticate} = require('../utils/auth');
// URL
// GET /todos
router.get('/', (req,res)=>{
    Todo.find().then(todos=>{
        res.json(todos);
    })
})
// POST /todos
router.post('/', authenticate, (req, res)=>{
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

/**
 * 1. TodoSchema 만들기
 * 2. 로그인한 유저만 TodoSchema를 작성할 수 있게 만들기 (API 및 라우터 만들기)
 * 3. React에서 로그인 구현하고, TodoList 기능 구현하기
 */

module.exports = router;