const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'Thread Title is required']
    },
    text: {
        type: String,
        required: [true, 'Thread Text is required']
    },
    imageLink: {
        type: String,
        required: [true, 'Please Link an image']
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'comment'
    },
    plant: {
        type: Schema.Types.ObjectId,
        ref: 'plant'
    }
});

const Thread = mongoose.model('thread', ThreadSchema);
module.exports = Thread;