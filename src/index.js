import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import App from './App';
import './styles/css/index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import WebFont from 'webfontloader';
import 'typeface-roboto';
import 'typeface-open-sans';

WebFont.load({
  google: {
    families: ['Open Sans', 'Roboto', 'Poppins']
  }
});

ReactDOM.render(
  <Router createBrowserHistory>
    <Switch>
      <Route component={App} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
