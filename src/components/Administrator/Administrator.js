import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chat.redux';
import UserCard from '../UserCard/UserCard';

@connect(
    state=>state.chat,
    {getUserList}
)
class Administrator extends Component {
    componentDidMount() {
        this.props.getUserList('leader');
    }
    render() {
        return (<UserCard userList={this.props.userlist}></UserCard>);
    }
}

export default Administrator;