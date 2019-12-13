/* eslint-disable react/jsx-filename-extension */

// 控制项目路由入口
import React from 'react';
import { Route } from 'react-router-dom';
import Index from './container/Index';
import About from './container/About';

export default (
  <div>
    <Route path="/" exact component={Index} />
    <Route path="/about" exact component={About} />
  </div>
);