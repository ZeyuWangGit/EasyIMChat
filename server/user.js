// import { user } from '../src/redux/user.redux';

const express = require('express');
const util = require('utility');
const Router = express.Router();
const Model = require('./model');
const User = Model.getModel('user');
const Chat = Model.getModel('chat');
const _filter = {'password': 0, '__v': 0};


const md5Salt = (pwd) =>{
    const salt = 's0mRIdlKvI';
    return util.md5(util.md5(pwd+salt));
}
Router.get('/list', (req, res) => {
    // User.remove({}, (e,d)=>{});
    const { userType } = req.query;
    User.find({ userType }, (err, doc)=>{
        return res.json({code: 0, data: doc});
    });
});
Router.post('/login',(req,res)=>{
    const {username, password} = req.body;
    User.findOne({username, password: md5Salt(password)},_filter,(err, doc)=> {
        if(!doc) {
            return res.json({code: 1, msg: 'Username or password are wrong!'})
        }
        res.cookie('userid', doc._id);
        return res.json({code: 0, data: doc})
    })
})
Router.post('/register', (req, res)=>{
    console.log(req.body);
    const {username, password, userType} = req.body;
    User.findOne({username}, (err, doc)=>{
        if(doc) {
            return res.json({code: 1, msg: 'User Name already existed!'})
        }
        const userModel = new User({username, userType, password: md5Salt(password)});
        userModel.save((e,d)=>{
            if(e) {
                return res.json({code: 1, msg: 'Server Break Down!'})
            }
            const {username, userType, _id} = d;
            res.cookie('userid', _id);
            return res.json({code: 0, data: {username, userType, _id}})
        })
        // User.create({username, userType, password: md5Salt(password)},(e,d)=>{
        //     if(e) {
        //         return res.json({code: 1, msg: 'Server Break Down!'})
        //     }
        //     return res.json({code: 0})
        // })
    })
});

Router.post('/update',(req,res)=>{
    const {userid} = req.cookies;
    if(!userid) {
        return res.json({code: 1});    
    }
    const body = req.body;
    User.findByIdAndUpdate(userid, body, function (err, doc) {
        const data = Object.assign({},{
            username: doc.username,
            userType: doc.userType
        }, body)
        return res.json({code:0, data})
    })

})

Router.get('/info', function (req, res) {
    const {userid} = req.cookies;
    if(!userid) {
        return res.json({code: 1});    
    }
    User.findOne({_id: userid},_filter, function (err,doc){
        if (err){
            return res.json({code: 1, msg: 'Server break down'});       
        }
        if (doc) {
            return res.json({code: 0, data: doc});       
        }
        
    })
    
});

Router.get('/getmessagelist', function (req, res) {
    const { userid } = req.cookies;
    User.find({},function(e, userdoc){
        let users = {}
        userdoc.forEach(v=>{
            users[v._id]={name: v.username, department: v.department, group: v.group}
        })
        Chat.find({'$or':[{from: userid}, {to: userid}]},function (err, doc) {
            if(!err){
                return res.json({code: 0, messages: doc, users: users})
            }
        })
    })
    
})

module.exports = Router;

