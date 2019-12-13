// 存储入口

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; // 支持异步
import indexReducer from './index';
import aboutReducer from './about';

const reducer = combineReducers({
  index: indexReducer,
  about: aboutReducer,
})

// 创建store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;