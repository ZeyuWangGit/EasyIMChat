import React from 'react';
import Logo from '../../components/logo/logo';
import {List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.register = this.register.bind(this);
    }
    register(){
        this.props.history.push('/register');
    }

    render(){
        return(
            <div>
                <Logo />
                <h2>Login Page</h2>
                <WingBlank>
                    <List>
                        <InputItem>User</InputItem>
                        
                        <InputItem>Password</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type='primary'>Login</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>Register</Button>
                </WingBlank>
            </div>
            
        )
    }
}

export default Login;