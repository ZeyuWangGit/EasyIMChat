import axios from 'axios';

const USER_LIST = 'USER_LIST';

const initState = {
    userlist: []
}

export function chat(state=initState, action){
    switch(action.type){
        case USER_LIST:
            return {
                ...state,
                userlist: action.payload
            }
        default:
            return state
    }
}

function userListAction(data){
    return {
        type: USER_LIST,
        payload: data
    }
}

export function getUserList(userType){
    return dispatch=>{
        axios.get('/user/list?userType='+userType)
            .then(res=>{
                if(res.data.code===0) {
                    dispatch(userListAction(res.data.data))
                }
            })
    }
}