const mongoose = require('../db');

const CommentSchema = new mongoose.Schema({
    writer: {
       type: String,
       required: true,
    },
    content: {
       type: String,
       required: true,
       validate: function(val) {
           return val.trim() !== "" && val.length > 1;
       }
    },
    target: {
       type: mongoose.Types.ObjectId,
       required: true,
       ref: "Review"
    }
}, {
    timestamps: true
});

CommentSchema.virtual('relatedReview', {
    ref: "Review",
    localField: "target",
    foreignField: "_id"
});

CommentSchema.virtual('relatedMovie', {
    ref: "Movie",
    localField: "target",
    foreignField: "_id"
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
