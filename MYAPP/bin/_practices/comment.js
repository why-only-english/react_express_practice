const mongoose = require('../db');
const Comment = require('../_practices/comment'); 
const Board = require('../routes/board');

// 1. 특정 Board에 대한 Comment 추가 함수
async function addCommentToBoard(boardId, writer, content) {
    const comment = await Comment.create({ writer, content, target: boardId });
    console.log("Board에 대한 Comment 추가 완료:", comment);
    return comment;
}

// 2. 특정 Board에 대한 모든 Comment 조회 함수
async function getCommentsByBoard(boardId) {
    const comments = await Comment.find({ target: boardId });
    console.log("특정 Board에 대한 모든 Comment 조회 결과:", comments);
    return comments;
}

// 3. 특정 Comment 수정 함수
async function updateComment(commentId, updatedContent) {
    const comment = await Comment.findByIdAndUpdate(
        commentId,
        { content: updatedContent },
        { new: true } // 업데이트된 데이터를 반환하도록 설정
    );
    console.log("특정 Comment 수정 완료:", comment);
    return comment;
}

// 4. 특정 Comment 삭제 함수
async function deleteComment(commentId) {
    const result = await Comment.findByIdAndDelete(commentId);
    console.log("특정 Comment 삭제 완료:", result);
    return result;
}

// 함수 예제 호출 (필요에 따라 주석을 해제하여 사용)
(async () => {
    // 특정 Board에 Comment 추가
    // await addCommentToBoard("게시글 ID", "작성자 이름", "댓글 내용");

    // 특정 Board에 대한 모든 Comment 조회
    // await getCommentsByBoard("게시글 ID");

    // 특정 Comment 수정
    // await updateComment("수정할 Comment의 ID", "새로운 댓글 내용");

    // 특정 Comment 삭제
    // await deleteComment("삭제할 Comment의 ID");
})();
