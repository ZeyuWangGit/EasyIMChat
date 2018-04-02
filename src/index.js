import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducers from './reducer';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRouter from './components/AuthRouter/AuthRouter';
import LeaderInfo from './container/leaderinfo/LeaderInfo';
import MemberInfo from './container/memberinfo/MemberInfo';
import DashBoard from './components/dashBoard/DashBoard';
import ChatComponent from './components/Chat/Chat';
import './config';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension? window.devToolsExtension(): f=>f
));


ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRouter></AuthRouter>
                <Switch>
                    <Route path='/leaderinfo' component={LeaderInfo}></Route>
                    <Route path='/memberinfo' component={MemberInfo}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/chat/:username' component={ChatComponent}></Route>
                    
                    <Route component={DashBoard}></Route>
                </Switch>                
            </div>
        </BrowserRouter>
    </Provider>), 
    document.getElementById('root'));
registerServiceWorker();

