import React, { Component } from 'react';
import axios from 'axios';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chat.redux';

@connect(
    state=>state.chat,
    {getUserList}
)
class Member extends Component {
    componentDidMount() {
        this.props.getUserList('member');
    }
    render() {
        return (
            
            <WingBlank>
                {
                    this.props.userlist.map(v=>(
                        <Card key={v._id}>
                            <Card.Header title={v.username} extra={`Group:${v.group} Department:${v.department}`}></Card.Header>
                            <Card.Body>
                                {v.description.split('\n').map(v=>(
                                    <div key={v}>{v}</div>
                                ))}
                            </Card.Body>

                        </Card>
                        
                    )    
                    )
                }
            </WingBlank>
        );
    }
}

export default Member;