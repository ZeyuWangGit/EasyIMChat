import React from 'react';
import Logo from '../../components/logo/logo';
import {List, InputItem, WingBlank, Radio, WhiteSpace, Button, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';

@connect(
    state=> state.user,
    { register }
)
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            rePassword:'',
            userType: 'leader'
        }
        this.handleRegister = this.handleRegister.bind(this);
        this.infowindowPopup = this.infowindowPopup.bind(this);
    }
    componentDidMount() {
        this.infowindowPopup(this.props.message);
    }
    handleChange = (key, val) =>{
        this.setState({
            [key]:val
        })
    }
    handleRegister = () => {
        this.props.register(this.state)
    }
    infowindowPopup = (data) => {
        data?Toast.info(data):null
    }
    render(){
        const RadioItem = Radio.RadioItem;
        
        return(
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo} />: null}
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem onChange={v=>this.handleChange('username',v)}>
                            User Name
                        </InputItem>
                        <InputItem type="password" onChange={v=>this.handleChange('password',v)}>
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