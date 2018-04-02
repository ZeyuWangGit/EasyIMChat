const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/easyimchat';
mongoose.connect(DB_URL);

const models = {
    user: {
        'username': {type: String, require: true},
        'password': {type: String, require: true},
        'userType': {type: String, require: true},
        'avatar': {type: String},
        'description': {type: String},
        'group': {type: String},
        'department': {type: String},
        'project': {type: String},

    },
    chat: {
        'chatid': {type: String, require: true},
        'from': {type: String, require: true},
        'to': {type: String, require: true},
        'content': {type: String, require: true, default:''},
        'create_time': {type: Number, default: new Date().getTime()},
        'read': {type: Boolean, require: false},

    }
}

for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name){
        return mongoose.model(name)
    }
}