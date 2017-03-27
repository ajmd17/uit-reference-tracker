import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import CategoriesView from './CategoriesView';
import ReferencesView from './ReferencesView';


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={CategoriesView}/>
      <Route path='/category/:categoryId' component={ReferencesView}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
