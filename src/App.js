/* eslint-disable react/jsx-filename-extension */

// 控制项目路由入口
import React from 'react';
import { Route } from 'react-router-dom';
import routes from './routes';
import Header from './component/Header';

// export default (
//   <div>
//     <Route path="/" exact component={Index} />
//     <Route path="/about" exact component={About} />
//   </div>
// );

// 改成从routes生成路由
export default (
  <div>
    <Header />
    {routes.map(route => <Route {...route} />)}
  </div>
);