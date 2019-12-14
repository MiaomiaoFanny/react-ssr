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
export const getServerStore = () => {
  return createStore(reducer, applyMiddleware(thunk));
}

export const getClientStore = () => {
  // 通过挂载在window上的__context数据获取服务端数据
  const defaultState = window.__context ? window.__context : {};
  return createStore(reducer, defaultState, applyMiddleware(thunk));
}