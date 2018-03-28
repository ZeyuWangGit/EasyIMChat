const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.get('/', function(req, res) {
    res.send('<h1>hellow world</h1>');
})

app.listen(9093, function() {
    console.log("Node app start on port 9093");
})