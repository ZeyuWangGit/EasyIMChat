import React from 'react';
import logo from './logo.png';
import './logo.css';

class Logo extends React.Component {
    render(){
        return(
            <div className="logo-container">
                <img src={logo} alt="Logo"/>
            </div>
        )
    }
}

export default Logo;