/* eslint-disable react/jsx-filename-extension */
// Index页面

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getIndexList } from '../store/index';

function Index(props) {
  const [count, setCount] = useState(1);
  useEffect(() => {
    // TODO: 异步数据首页显示
    props.getIndexList()
  }, []);
  return (
    <div>
      <h1>Fanny, {props.title}</h1>
      <h3>Count is {count}</h3>
      <button onClick={() => setCount(count + 1)}>Try Click Me</button>
      <br/>
      <ul>
        {props.list.map(item => {
          return <li key={item.id}>{item.name}</li>
        })}
      </ul>
    </div>
  );
}

export default connect(
  state => ({ list: state.index.list, title: state.index.title }),
  {
    getIndexList
  }
)(Index);