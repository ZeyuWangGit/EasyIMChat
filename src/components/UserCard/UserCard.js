import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

class UserCard extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    render() {
        return (
            <WingBlank>
                {
                    this.props.userList.map(v=>(
                        <Card onClick={() => {console.log("click")}} key={v._id}>
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