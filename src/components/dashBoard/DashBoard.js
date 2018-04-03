import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import NavLinkBar from '../navLinkBar/NavLinkBar';
import { Switch, Route } from 'react-router-dom';
import Member from '../Member/Member';
import Personal from '../Me/Me';
import Message from '../Message/Message';
import Administrator from '../Administrator/Administrator';
import { getMessageList, receiveMessage } from '../../redux/message.redux';

@connect(
    state=>state,
    { getMessageList, receiveMessage }
)

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount() {
        if(!this.props.messageRedux.chatMessage.length){
            this.props.getMessageList();
            this.props.receiveMessage();
        }
    }
    render() {
        const user = this.props.user;
        const { pathname } = this.props.location;
        const navList =[{
            path: '/member',
            text: 'Collegues',
            icon: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat',
            selectedIcon: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat',
            title: 'Collegue List',
            component: Member
        },{
            path: '/leader',
            text: 'Administrator',
            icon: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat',
            selectedIcon: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat',
            title: 'Administration',
            component: Administrator,
            hide: user.userType === 'member'
        },{
            path: '/message',
            text: 'Message',
            icon: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat',
            selectedIcon: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat',
            title: 'Message',
            component: Message
        },{
            path: '/me',
            text: 'Me',
            icon: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat',
            selectedIcon: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat',
            title: 'Me',
            component: Personal
        }]
        return (
            <div>
                <NavBar className="fixed-header" mode="light">{navList.find(v=>v.path===pathname).title}</NavBar>
                <div style={{marginTop:45}}>
                    
                        {
                            navList.map(v=>(
                                <Route key={v.path} path={v.path} component={v.component}></Route>
                            ))
                        }
                    
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        );
    }
}

export default DashBoard;