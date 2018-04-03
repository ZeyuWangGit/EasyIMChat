import socketIO from 'socket.io-client';
import axios from 'axios';


const socket = socketIO('ws://localhost:9093');

const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';

const initState = {
    chatMessage:[],
    unread:0,
    users: {}
}

export function messageRedux(state=initState, action){
    switch(action.type){
        case MSG_LIST:
            return {
                ...state,
                chatMessage: action.payload.message,
                users: action.payload.users,
                unread: action.payload.message.filter(v=>!v.read&&v.to===action.payload.userid).length
            }
        case MSG_RECV:
            return {
                ...state,
                chatMessage: [...state.chatMessage, action.payload.data],
                unread: state.unread+(action.payload.data.to===action.payload.userid?1:0)
            }
        case MSG_READ:
            const {from, to ,num} = action.payload;
            return {
                ...state,
                chatMessage: state.chatMessage.map(v=>{
                    v.read = from===v.from?true:v.read;
                    return v;
                }),
                unread: state.unread-num
            }
        default:
            return state;
    }
}

const messageList = (message, users, userid) => {
    return {
        type: MSG_LIST,
        payload: { message, users, userid }
    }
}

export function getMessageList(){
    return (dispatch, getState)=>{
        axios.get('/user/getmessagelist')
            .then(res=>{
                const userid = getState().user._id;
                if(res.status===200 && res.data.code===0) {
                    dispatch(messageList(res.data.messages, res.data.users, userid))
                } else {

                }
            })
    }
}

export function sendMessage({from, to ,message}){
    return dispatch=>{
        socket.emit('sendMessage', {from, to ,message});
    }
    
}
const messageReceive = (data, userid)=>{
    return {
        type: MSG_RECV,
        payload: {data, userid}
    }
}
export function receiveMessage() {
    return (dispatch, getState)=>{
        socket.on('receiveMessage', function (data) {
            console.log(data)
            dispatch(messageReceive(data, getState().user._id))
        })
    }
}
function messageRead(from,to,num) {
    return {
        type: MSG_READ,
        payload: {from, to ,num}
    }
}
export function readMessage(from){
    return (dispatch, getState)=>{
        axios.post('/user/readMessage', { from })
            .then(res=>{
                console.log(from)
                const userid = getState().user._id;
                if (res.status===200&& res.data.code===0){
                    dispatch(messageRead(userid, from, res.data.code))
                }
            })
    }
}