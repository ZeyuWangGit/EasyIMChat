import axios from 'axios';
import { getRedirectPath } from '../util';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERROR_MESSAGE = 'ERROR_MESSAGE';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
    redirectTo:'',
    isAuth: false,
    message: '',
    username: '',
    password: '',
    userType: '',
    _id:''
    
}
// reducer
export function user(state=initState, action){
    switch(action.type){
        case REGISTER_SUCCESS:
            return {
                ...state,
                message:'',
                isAuth: true,
                ...action.payload,
                redirectTo: getRedirectPath(action.payload)
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                message:'',
                isAuth: true,
                ...action.payload,
                redirectTo: getRedirectPath(action.payload)
            }
        case LOAD_DATA:
        
            return {
                ...state,
                ...action.payload,
            }
        case ERROR_MESSAGE:
            return {
                ...state,
                message: action.message,
                isAuth: false,
            }
        default:
            return state;
    }
    
}

const errorMsg = (message) => {
    return {
        message,
        type: ERROR_MESSAGE
    }
}

const registerSuccess = (data) => {
    return {
        type: REGISTER_SUCCESS,
        payload: data
    }
}

export function register({username, password, rePassword, userType}) {
    if(!username || !password || !userType) {
        return errorMsg('You must enter username and password!');
    }
    if (password != rePassword) {
        return errorMsg('The password is different to the re-password!');
    }
    return dispatch=>{
        axios.post('/user/register', {username, password, userType})
        .then(res=>{
            console.log(res)
            if(res.status === 200 && res.data.code === 0){
                dispatch(registerSuccess({username, password, userType}));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}


const loginSuccess = (data) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}

export function login({username, password}){
    if(!username || !password) {
        return errorMsg('You must enter username and password!');
    }
    return dispatch=>{
        axios.post('/user/login', {username, password})
        .then(res=>{
            console.log(res)
            if(res.status === 200 && res.data.code === 0){
                dispatch(loginSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}

export function loadData(userinfo){
    console.log(userinfo)
    return dispatch=>{
        dispatch({
            type: LOAD_DATA,
            payload: userinfo
        })
    }
    
}