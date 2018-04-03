import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';

@connect(
    state=>state,
)
class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const messageGroup = {};
        this.props.messageRedux.chatMessage.forEach(v=>{
            messageGroup[v.chatid] = messageGroup[v.chatid] || []
            messageGroup[v.chatid].push(v)
        })
        const chatList = Object.values(messageGroup).sort((a,b)=>{
            return a[a.length-1].create_time - b[b.length-1].create_time
        });
        const userid = this.props.user._id;
        return (
            <div>
                <List>
                    {
                        chatList.map(v=>{
                            const lastItem = v[v.length-1];
                            const targetId = v[0].from===userid?v[0].to:v[0].from;
                            const unreadNum = v.filter(v=>!v.read&&v.to===userid).length;
                            return (
                                <List.Item key={lastItem._id} extra={<Badge text={unreadNum}></Badge>} arrow="horizontal" 
                                        onClick={()=>{
                                            this.props.history.push(`/chat/${targetId}`)
                                        }}>
                                    {lastItem.content}
                                    <List.Item.Brief>{this.props.messageRedux.users?this.props.messageRedux.users[targetId].name:''}</List.Item.Brief>
                                </List.Item>
                            )
                        })    
                    }
                </List>
            </div>
        );
    }
}

export default Message;