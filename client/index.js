import React from 'react';
import ReactDom from 'react-dom';
import App from '../src/App';

// 由于已经SSR, 所以使用hydrate注水
ReactDom.hydrate(App, document.getElementById('root'));
