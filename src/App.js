import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header/index';
import Jitsi from './components/Jitsi';
import Home from './pages/home/index';
import Login from './pages/login/index';
import NoExist from './pages/noExists';
import GlobalStyle from './styles/css/globalStyles';

class App extends Component {
  constructor(props) {
    super(props);
    this.idleTimer = null;
  }

  render() {
    return (
      <div className='App' style={{ minHeight: '100vh', background: '#f3f3f3' }}>
        <Switch>
          <Route exact path='(/login|/)' render={(props) => <Login {...props} />} />
          <Route exact path='/home' component={Home} />
          <Route exact component={NoExist} />
        </Switch>
        <GlobalStyle />
      </div>
    );
  }
}

export default App;
