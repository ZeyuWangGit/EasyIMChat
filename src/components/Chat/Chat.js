import React, { Component } from 'react';
import socketIO from 'socket.io-client';
import { List, InputItem, Button, NavBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import { sendMessage, getMessageList, receiveMessage, readMessage } from '../../redux/message.redux';


const socket = socketIO('ws://localhost:9093');
@connect(
    state=>state,
    { sendMessage, getMessageList, receiveMessage, readMessage }
)
class ChatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            textMessage: '',
            messageList: []
         };
         this.handleInput = this.handleInput.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        if(!this.props.messageRedux.chatMessage.length){
            this.props.getMessageList();
            this.props.receiveMessage();
        }
        
    }
    componentWillUnmount(){
        const to = this.props.match.params.username;
        this.props.readMessage(to);
    }
    handleInput(value){
        this.setState({
            textMessage: value
        })
    }
    handleSubmit(){
        const from = this.props.user._id;
        const to = this.props.match.params.username;
        const message = this.state.textMessage;
        this.props.sendMessage({from, to ,message})
        this.setState({
            textMessage: ''
        })
    }
    
    render() {
        const userid = this.props.match.params.username;
        const chatid = [this.props.user._id, userid].sort().join('-');
        const users = this.props.messageRedux.users;
        if(!users[userid]){
            return null;
        }
        const chatMessages = this.props.messageRedux.chatMessage.filter(v=>v.chatid===chatid);
        return (
            <div id='chat-page'>
                <NavBar mode='light' icon={<Icon type="left" />} onLeftClick={()=>{this.props.history.goBack()}}>
                    {
                        `${users[userid].name} (${users[userid].group} in ${users[userid].department})`
                    }
                </NavBar>

                {
                    chatMessages.map(v=>{
                        
                            return v.from===userid?(
                                <List key={v._id}>
                                    <List.Item>{v.content}</List.Item>
                                </List>
                            ): (
                                <List key={v._id}>
                                    <List.Item className='chat-me' extra={'me'}>{v.content}</List.Item>
                                </List>
                            )
                        
                    })
                }
                <div className="stick-footer">
                    <List>
                        <InputItem 
                            value={this.state.textMessage}
                            onChange={v=>{this.handleInput(v)}}
                            extra={<span onClick={this.handleSubmit}>Send</span>}
                        >
                        </InputItem>
                    </List>
                </div>
            </div>
        );
    }
}

export default ChatComponent;