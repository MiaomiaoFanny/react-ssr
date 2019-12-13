/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../src/App';
import store from '../src/store/store';

const Page = (<Provider store={store}>
  <BrowserRouter>{App}</BrowserRouter>
</Provider>
);

// 由于已经SSR, 所以使用hydrate注水
ReactDom.hydrate(Page, document.getElementById('root'));
// ReactDom.hydrate(App, document.getElementById('root'));
