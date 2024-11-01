const mongoose = require('mongoose');
/**
 * 게시글 하나에 Comment가 여러개 달릴 수 있다. (SQL -> OneToMany 관계, FK는 Many쪽에)
 * --> 1번 게시글에 Comment를 추가한다. (추가된 Comment에서 1번게시글을 참조하게 하자)
 * 
  1. 특정 Board에 대한 Comment를 추가하는 함수를 만드시오. (/board/<boardId>/comment POST)
  2. 특정 Board(게시글)에 대한 Comment를 모두 조회하는 함수를 만드시오. 
      (/board/<boardId>/comment GET)
  3. 특정 Comment를 수정하는 함수를 만드시오. (/comment/<commentId> PUT)
  4. 특정 Comment를 삭제하는 함수를 만드시오. (/comment/<commentId> DELETE)
 */


// REST API ()
// REpresentational State Transfer : Application Programming Interface

// URL과 Method만 보아도, 무슨 자원에 대한 어떤 요청인지가 잘 나타내면 좋겠다.
/**
 * GET  /board            : 게시글 리스트를 GET
 * POST /board            : 게시글 등록해줘. POST
 * PUT  /board/<boardId>  : boardId에 해당하는 게시글 수정
 * DELETE /board/<boardId>: boardId에 있는 게시글 삭제
 * GET  /board/<boardId>  : boardId에 해당하는 게시글을 GET
 */

/**
 * GET  /comment?boardId=~~              : 댓글 리스트를 GET
 * POST /comment              : 댓글을 등록. POST  (request body에 boardId정보를 담아)
 * GET /comment/<commentId>   : commentId에 해당하는 댓글을 조회
 * PUT  /comment/<commentId>  : commentId에 해당하는 댓글을 수정
 * DELETE /comment/<commentId>: commentId에 해당하는 댓글을 삭제
 */

/**
 * GET  /board/<boardId>/comment : boardId에 해당하는 게시글의 댓글 조회
 * POST /board/<boardId>/comment : boardId에 해당하는 댓글 등록
 * PUT  /comment/<commentId>     : commentId에 해당하는 댓글 수정
 * DELETE /comment/<commentId>   : commentId에 해당하는 댓글 삭제
 */


const commentSchema = new mongoose.Schema({
    content: {type:String, required: true},
    author: String,
    board: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Board"
    },
    createdAt: {type: Date, default: Date.now},
  })
  
  const Comment = mongoose.model("Comment", commentSchema);
  
  module.exports = Comment
  