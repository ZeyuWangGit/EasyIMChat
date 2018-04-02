import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace, Button, Modal  } from 'antd-mobile';
import browserCookie from 'browser-cookies';
import { logoutSubmit } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';

@connect(
    state=>state.user,
    { logoutSubmit }
)

class Personal extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
        this.logout = this.logout.bind(this);
    }
    logout(){
        // browserCookie.erase('userid');
        const alert = Modal.alert;
        console.log('logout')
        alert('Logout', 'Are you sure?', [
            { text: 'Cancel', onPress: () => {} },
            { text: 'Ok', onPress: () => {
                browserCookie.erase('userid');
                this.props.logoutSubmit();
            } },
          ])
    }
    render() {
        const Item = List.Item;
        const Brief = Item.Brief;
        const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
        return this.props.username?(
            <div>
                
                <Result
                    title={this.props.username}
                    message={`${this.props.department} - ${this.props.group}`}
                />
                <List renderHeader={() => 'Personal Information'}>
                    <Item extra={this.props.department}>Department</Item>
                    <Item extra={this.props.group}>Group</Item>
                    <Item>Personal Statement {this.props.description.split('\n').map(v=><Brief key={v}>{v}</Brief>)}</Item>
                </List>
                <WhiteSpace></WhiteSpace>
                
                <Button onClick={this.logout}>Logout</Button>
                
                
            </div>
            
        ):<Redirect to={'/login'} />;
    }
}

export default Personal;