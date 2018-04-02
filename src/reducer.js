import { combineReducers } from 'redux';
import { user } from './redux/user.redux';
import { chat } from './redux/chat.redux';
import { messageRedux } from './redux/message.redux';

export default combineReducers({user, chat, messageRedux});