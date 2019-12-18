// 存储入口

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; // 支持异步
import createAxios from '../plugin/axios';
import indexReducer from './index';
import aboutReducer from './about';

const reducer = combineReducers({
  index: indexReducer,
  about: aboutReducer,
});

const serverAxios = createAxios({
  baseURL: 'http://localhost:9090',
});

const clientAxios = createAxios();

// 创建store
export const getServerStore = () => {
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)));
}

export const getClientStore = () => {
  // 通过挂载在window上的__context数据获取服务端数据
  const defaultState = window.__context ? window.__context : {};
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)));
}