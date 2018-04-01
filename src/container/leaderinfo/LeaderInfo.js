import React, { Component } from 'react';

import { List, InputItem, WingBlank, WhiteSpace, Button, TextareaItem, NavBar } from 'antd-mobile';

import { connect } from 'react-redux';
import { update } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';

@connect(
    state=> state.user,
    { update }
)
class LeaderInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            department: '',
            group:'',
            project:'',
            description: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (key, val) =>{
        this.setState({
            [key]:val
        })
    }
    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                {redirect&&redirect!==path ?<Redirect to={this.props.redirectTo} />: null}
                <NavBar mode="light" >Leader Info Page</NavBar>
                <WhiteSpace></WhiteSpace>
                <WingBlank>
                    <List>
                        <InputItem onChange={v=>this.handleChange('department',v)}>
                            department
                        </InputItem>
                        <InputItem onChange={v=>this.handleChange('group',v)}>
                            Group
                        </InputItem>
                        <InputItem onChange={v=>this.handleChange('project',v)}>
                            Project
                        </InputItem>
                        <TextareaItem onChange={v=>this.handleChange('description',v)} rows={3} title='Description' autoHeight></TextareaItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={()=>{this.props.update(this.state)}} type='primary'>Save</Button>
                </WingBlank>
                
            </div>
        );
    }
}


export default LeaderInfo;