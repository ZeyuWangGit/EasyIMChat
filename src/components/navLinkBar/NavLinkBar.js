import React, { Component } from 'react';
import propTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

@withRouter
@connect(
    state=>state.messageRedux
)
class NavLinkBar extends Component {
    static propTypes = {
        data: propTypes.array.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        
        const navList = this.props.data.filter(v=>!v.hide);
        const { pathname } = this.props.location;
        return (
            <TabBar>
                {
                    navList.map(v=>(
                        <TabBar.Item
                            title={v.text}
                            key={v.path}
                            noRenderContent
                            badge={v.path==='/message'?this.props.unread:0}
                            icon={
                                <div style={{
                                  width: '22px',
                                  height: '22px',
                                  background: `${v.icon}` }}
                                />}
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: `${v.selectedIcon}` }}
                                  />
                            }
                            selected={pathname===v.path}
                            onPress={()=>{
                                this.props.history.push(v.path)
                            }}
                        ></TabBar.Item>
                    ))
                }
            </TabBar>
        );
    }
}

export default NavLinkBar;