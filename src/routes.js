/* eslint-disable react/jsx-filename-extension */

// 控制项目路由入口
import Index from './container/Index';
import About from './container/About';

// 定义routes, 目的: 方便server端获取路由信息
export default [
  {
    path: '/',
    component: Index,
    loadData: Index.loadData,
    exact: true,
    key: 'index',
  },
  {
    path: '/about',
    component: About,
    exact: true,
    key: 'about',
  }
]