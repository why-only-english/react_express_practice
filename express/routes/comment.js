const express = require('express');
const router = express.Router();

const Comment = require('../models/Comment');
router.put('/:commentId', (req, res)=>{
    Comment.findByIdAndUpdate(req.params.commentId, {
        content: req.body.content,
        author: req.body.author
    }).then(result=>{
        res.json(result);
    })
})

router.delete('/:commentId', (req,res)=>{
    Comment.findByIdAndDelete(req.params.commentId).then(result=>{
        res.status(204).json();
    });
})

/**
 * GET  /board/<boardId>/comment : boardId에 해당하는 게시글의 댓글 조회
 * POST /board/<boardId>/comment : boardId에 해당하는 댓글 등록
 * PUT  /comment/<commentId>     : commentId에 해당하는 댓글 수정
 * DELETE /comment/<commentId>   : commentId에 해당하는 댓글 삭제
 */


module.exports = router;