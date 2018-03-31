import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import reducers from './reducer';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRouter from './components/AuthRouter/AuthRouter';
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
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
            </div>
        </BrowserRouter>
    </Provider>), 
    document.getElementById('root'));
registerServiceWorker();

