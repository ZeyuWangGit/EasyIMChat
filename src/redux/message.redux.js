import socketIO from 'socket.io-client';
import axios from 'axios';


const socket = socketIO('ws://localhost:9093');

const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';

const initState = {
    chatMessage:[],
    unread:0,
}

export function messageRedux(state=initState, action){
    switch(action.type){
        case MSG_LIST:
            return {
                ...state,
                chatMessage: action.payload,
                unread: action.payload.filter(v=>!v.read).length
            }
        case MSG_RECV:
            return {
                ...state,
                chatMessage: [...state.chatMessage, action.payload],
                unread: state.unread+1
            }
        case MSG_READ:
        default:
            return state;
    }
}

const messageList = (message) => {
    return {
        type: MSG_LIST,
        payload: message
    }
}

export function getMessageList(){
    return dispatch=>{
        axios.get('/user/getmessagelist')
            .then(res=>{
                if(res.status===200 && res.data.code===0) {
                    dispatch(messageList(res.data.messages))
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
const messageReceive = (data)=>{
    return {
        type: MSG_RECV,
        payload: data
    }
}
export function receiveMessage() {
    return dispatch=>{
        socket.on('receiveMessage', function (data) {
            console.log(data)
            dispatch(messageReceive(data))
        })
    }
}