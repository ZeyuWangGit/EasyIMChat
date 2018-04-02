import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chat.redux';
import UserCard from '../UserCard/UserCard';

@connect(
    state=>state.chat,
    {getUserList}
)
class Member extends Component {
    componentDidMount() {
        this.props.getUserList('member');
    }
    render() {
        return (<UserCard userList={this.props.userlist}></UserCard>);
    }
}

export default Member;