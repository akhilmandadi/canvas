const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cards: [
        {
            id: String,
            name: String,
            department: String,
            semester: String
        }
    ]
}, { _id: false }, { collection: 'users' });

const createModel = function () {
    return mongoose.model("users", userSchema)
}

module.exports.createModel = createModel;
