import React, { Component } from 'react';
import socketIO from 'socket.io-client';
import { List, InputItem, Button, NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMessageList, sendMessage, receiveMessage } from '../../redux/message.redux';


const socket = socketIO('ws://localhost:9093');
@connect(
    state=>state,
    { getMessageList, sendMessage, receiveMessage }
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
        this.props.getMessageList();
        this.props.receiveMessage();
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
        const user = this.props.match.params.username;
        const chatid = [this.props.user._id, user].sort().join('-')
        return (
            <div id='chat-page'>
                <NavBar mode='light'>
                    {
                        user
                    }
                </NavBar>

                {
                    this.props.messageRedux.chatMessage.map(v=>{
                        if(v.chatid===chatid){
                            return v.from===user?(
                                <List key={v._id}>
                                    <List.Item>{v.content}</List.Item>
                                </List>
                            ): (
                                <List key={v._id}>
                                    <List.Item className='chat-me' extra={'me'}>{v.content}</List.Item>
                                </List>
                            )
                        }
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