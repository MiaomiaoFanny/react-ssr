/* eslint-disable react/jsx-filename-extension */
// Index页面

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getIndexList } from '../store/index';

function Index(props) {
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (props && !props.list.length) {
    // Client 端调用axios获取数据
      props.getIndexList();
    }
  }, []);
  return (
    <div>
      <h1>Fanny, {props.title}</h1>
      <h3>Count is {count}</h3>
      <button onClick={() => setCount(count + 1)}>Try Click Me</button>
      <br/>
      <ul>
        {props.list && props.list.map(item => {
          return <li key={item.id}>{item.name}</li>
        })}
      </ul>
    </div>
  );
}

// 模仿nuxt, 提前加载异步数据
Index.loadData = (store) => {
  // Server 端调用axios获取数据
  return store.dispatch(getIndexList());
}

export default connect(
  state => ({ list: state.index.list, title: state.index.title }),
  {
    getIndexList
  }
)(Index);