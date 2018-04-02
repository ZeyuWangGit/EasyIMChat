import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@withRouter
class UserCard extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(v){
        this.props.history.push(`/chat/${v._id}`);
    }
    render() {
        return (
            <WingBlank>
                {
                    this.props.userList.map(v=>(
                        <Card onClick={()=>this.handleClick(v)} key={v._id}>
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


export default UserCard;