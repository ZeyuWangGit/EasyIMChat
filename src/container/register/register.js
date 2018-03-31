import React from 'react';
import Logo from '../../components/logo/logo';
import {List, InputItem, WingBlank, Radio, WhiteSpace, Button } from 'antd-mobile';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            passowrd:'',
            rePassword:'',
            userType: 'leader'
        }
        this.handleRegister.bind(this);
    }
    handleChange = (key, val) =>{
        this.setState({
            [key]:val
        })
    }
    handleRegister = () => {

    }
    render(){
        const RadioItem = Radio.RadioItem;
        return(
            <div>
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem onChange={v=>this.handleChange('username',v)}>
                            User Name
                        </InputItem>
                        <InputItem type="password" onChange={v=>this.handleChange('passowrd',v)}>
                            Password
                        </InputItem>
                        <InputItem type="password" onChange={v=>this.handleChange('rePassword',v)}>
                            Confirm
                        </InputItem>
                    </List>
                    <WhiteSpace />
                    <List>
                        <RadioItem checked={this.state.userType==='leader'} onChange={()=>this.handleChange('userType','leader')}>Leader</RadioItem>
                        <RadioItem checked={this.state.userType==='member'} onChange={()=>this.handleChange('userType','member')}>Member</RadioItem>
                    </List>
                    <WhiteSpace />
                    <List>
                        <Button type="primary" onClick={this.handleRegister}>Register</Button>
                    </List>

                </WingBlank>
            </div>
        )
    }
}

export default Register;