const express = require('express');
const utility = require('utility');
const bodyParse = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user');

const app = express();
app.use(cookieParser());
app.use(bodyParse.json());
app.use('/user',userRouter);

app.listen(9093, function() {
    console.log("Node app start on port 9093");
})