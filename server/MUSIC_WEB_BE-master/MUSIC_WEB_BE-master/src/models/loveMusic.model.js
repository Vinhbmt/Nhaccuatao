const mongoose = require('mongoose');
const { Schema } = mongoose;

const LoveMusicModel = new Schema({
    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'accounts',
        required: true
    },
    musicId: {
        type: Schema.Types.ObjectId,
        ref: 'musics',
        required: true
    },
    createdAt: {
        type: Number,
        required: true
    },
    updatedAt: {
        type: Number,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'deleted'],
        default: 'active'
    }
})

module.exports = mongoose.model('love_musics', LoveMusicModel);