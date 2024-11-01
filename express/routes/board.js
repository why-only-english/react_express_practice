const express = require('express');
const router = express.Router();

const Board = require('../models/Board');


/**
 * 연습문제1.
 *   - 유저가 게시글 상세조회를 할 때마다, 가장 최근에 읽은 게시글 3개를 쿠키에 저장하시오.
 *   - [3]
 *   - [3, 1]
 *   - [3, 1, 2]
 *   - [1, 2, 4]
 */


router.get('/', (req, res, next)=>{
    console.log("유저가 보내온 쿠키:", req.cookies);
    
    Board.find().then(boards=>{
        res.cookie("my-cookie", "cookie-value", {
            maxAge: 1000 * 60 * 60 *24,
            secure: false, // https일때만 전송하는 쿠키
            httpOnly: true,
            signed: false
        })
        res.json(boards)
    }).catch(err=>{
        next(err)
    })
})

// https://search.naver.com/search.naver?query=무역전쟁&where=news
// https:            <Protocol>
// search.naver.com  <Host, Domain>
// /search.naver     <Path>
// ?query=무역전쟁&where=news 
// <Parameter, QueryParameter, QueryString, QuerySet

// url에 /:id (콜론으로 시작하는 문자열은 parameters)
// ==> req.params로 해당하는 문자열에 접근할 수 있다.
// 만약 /:id/reviews/:reviewId


// ==> req.params = {id: <입력내용1>, reviewId: <입력내용2>}
    /**
     * 연습문제1.
     *   - 유저가 게시글 상세조회를 할 때마다, 가장 최근에 읽은 게시글 3개를 쿠키에 저장하시오.
     *   - [3]
     *   - [3, 1]
     *   - [3, 1, 2]
     *   - [1, 2, 4]
     */
    
    /**
     * 유저가 게시글 상세조회할때마다 해당하는 라우터의 함수가 실행됨.
     * --> 유저의 게시글 탐색 순서를 쿠키에 저장하여 기록. (기록된 탐색순서 (최대 3개))
     */
router.get('/:id', (req, res, next)=>{
    // Board.findById(req.param.id).then(board=>{
    Board.findById(req.params.id).then(board=>{
        if (!req.session.boardPath){
            req.session.boardPath = [];
        }
        
        req.session.boardPath.push(board.title);
        
        if (req.session.boardPath.length > 10){
            req.session.boardPath.shift();
        }
        console.log(req.session.boardPath);

        res.json(board);
    }).catch(err=>{
        next(err);
    })
});

// router.get('/:id', (req, res, next)=>{
//     // Board.findById(req.param.id).then(board=>{
//     Board.findById(req.params.id).then(board=>{
//         let boardHistory = req.cookies[BOARD_HISTORY_COOKIE];
//         if (boardHistory){
//             boardHistory = JSON.parse(boardHistory);
//         }else{
//             boardHistory = []
//         }

//         console.log(boardHistory);
        
//         boardHistory.push(req.params.id);
//         if (boardHistory.length > 3){
//             boardHistory.shift();
//         }
//         res.cookie(BOARD_HISTORY_COOKIE, JSON.stringify(boardHistory), {
//             secure:true
//         })
//         res.json(board);
//     }).catch(err=>{
//         next(err);
//     })
// });

router.post('/', (req, res, next)=>{
    console.log(req.body);

    // Board.create(req.body).then(board=>{
    Board.create({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    }).then(board=>{
        res.json(board)
    }).catch(err=>{
        next(err)
    })
})
const Comment = require('../models/Comment')

router.get('/:boardId/comment', (req, res)=>{
    Comment.find({board: req.params.boardId}).then(boards=>{
        res.json(boards);
    })
});
router.post('/:boardId/comment', (req, res)=>{
    /**
     * req.body: {content, author}
     */
    Comment.create({
        board:req.params.boardId,
        content: req.body.content,
        author: req.body.author
    }).then(result=>{
        res.json(result);
    })
})

/**
 * GET  /board/<boardId>/comment : boardId에 해당하는 게시글의 댓글 조회
 * POST /board/<boardId>/comment : boardId에 해당하는 댓글 등록
 * PUT  /comment/<commentId>     : commentId에 해당하는 댓글 수정
 * DELETE /comment/<commentId>   : commentId에 해당하는 댓글 삭제
 */


module.exports = router;