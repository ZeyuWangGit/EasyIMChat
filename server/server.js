const express = require('express');
const utility = require('utility');
const bodyParse = require('body-parser');
const cookieParser = require('cookie-parser');
const Model = require('./model');
const User = Model.getModel('user');
const Chat = Model.getModel('chat');

const app = express();
const server = require('http').Server(app);
const socketIO = require('socket.io')(server);

socketIO.on('connection', function(socket){
    console.log('User Login');
    socket.on('sendMessage', function (data) {
        console.log(data);
        const {from, to, message} = data;
        
        const chatid = [from, to].sort().join('-');
        Chat.create({chatid, from ,to ,content: message}, function (err, doc) {
            socketIO.emit('receiveMessage',Object.assign({}, doc._doc)); 
        })


    })
})

const userRouter = require('./user');
app.use(cookieParser());
app.use(bodyParse.json());
app.use('/user',userRouter);

server.listen(9093, function() {
    console.log("Node app start on port 9093");
})