import React from 'react';
import Logo from '../../components/logo/logo';
import {List, InputItem, WingBlank, WhiteSpace, Button, Toast  } from 'antd-mobile';
import { connect } from 'react-redux';
import { login } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';

@connect(
    state=> state.user,
    { login }
)
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
        }
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    componentDidMount() {
        
    }
    register(){
        this.props.history.push('/register');
    }
    handleChange = (key, val) =>{
        this.setState({
            [key]:val
        })
    }
    handleLogin = () => {
        this.props.login(this.state);
    }
    infowindowPopup = (data) => {
        data?Toast.info(data):null
    }

    render(){
        this.infowindowPopup(this.props.message);
        return(
            <div>
                {this.props.redirectTo&&this.props.redirectTo!='/login'? <Redirect to={this.props.redirectTo} />: null}
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem onChange={v=>this.handleChange('username',v)}>
                            User Name
                        </InputItem>
                        <InputItem type="password" onChange={v=>this.handleChange('password',v)}>
                            Password
                        </InputItem>
                    </List>
                    <WhiteSpace />
                    <Button onClick={this.handleLogin} type='primary'>Login</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>Register</Button>
                </WingBlank>
            </div>
            
        )
    }
}

export default Login;