import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { loadData } from '../../redux/user.redux';
/**
 *  Authorate the information of the user
 */
@withRouter
@connect(
    null,
    { loadData }
)
class AuthRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount() {
        const publicList = ['/login','/register'];
        const pathName = this.props.history.location.pathname;
        if(publicList.indexOf(pathName)>-1){
            return null
        }
        // Get the infomation of the user
        axios.get('/user/info')
            .then(res=>{
                if(res.status === 200) { 
                    if(res.data.code === 0){
                        this.props.loadData(res.data.data);
                    } else {
                        this.props.history.push('/login')
                    }
                }
            });
    }
    
    render() {
        return (
            <div></div>    
        );
    }
}

export default AuthRouter;