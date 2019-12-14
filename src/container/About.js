/* eslint-disable react/jsx-filename-extension */
// About页面

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAppInfo } from '../store/about';

function About(props) {
  useEffect(() => {
    // TODO: 异步数据首页显示
    if(!props.info.name) {
      props.getAppInfo();
    }
  }, []);
  return (
    <div>
      <h1>About {props.info.name}.</h1>
    </div>
  );
}

// 模仿nuxt, 提前加载异步数据
About.loadData = (store) => {
  return store.dispatch(getAppInfo());
}

export default connect(
  state => ({ info: state.about.info }),
  {
    getAppInfo
  }
)(About);