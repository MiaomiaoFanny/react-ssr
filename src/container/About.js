/* eslint-disable react/jsx-filename-extension */
// About页面

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAppInfo } from '../store/about';

function About(props) {
  useEffect(() => {
    // TODO: 异步数据首页显示
    props.getAppInfo()
  }, []);
  return (
    <div>
      <h1>About {props.info.name}.</h1>
    </div>
  );
}

export default connect(
  state => ({ info: state.about.info }),
  {
    getAppInfo
  }
)(About);