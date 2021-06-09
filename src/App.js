import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header/index';
import Home from './pages/home/index';
import User from './pages/user/index';
import Login from './pages/login/index';
import ProfessionalSession from './pages/sessions/professionalSession';
import StudentSession from './pages/sessions/studentSession';
import Students from './pages/students/operation/index';
import NewStudent from './pages/students/request/index';
import MeetingInstanly from './pages/sessions/meetingInstanly';
import MeetingForLater from './pages/sessions/meetingForLater';
import Schedule from './pages/schedule/index';
import NoExist from './pages/noExists';
import GlobalStyle from './styles/css/globalStyles';
import IdleTimer from 'react-idle-timer';
import swal from '@sweetalert/with-react';

class App extends Component {
  constructor(props) {
    super(props);
    this.idleTimer = null;
    this.handleOnIdle = this.handleOnIdle.bind(this);
  }

  idleTime = () => {
    swal(
      <div>
        <p className='h4 mt-4 mb-3'>¿Todavía sigues aquí?</p>
      </div>,
      {
        icon: 'error',
        timer: 8000,
        buttons: {
          cancel: 'No',
          catch: {
            text: 'Si',
            value: 'idle'
          }
        }
      }
    ).then((value) => {
      if (value !== 'idle') {
        sessionStorage.clear();
        this.props.history.push(`/login`);
      }
    });
  };

  handleOnIdle() {
    this.idleTime();
  }

  render() {
    return (
      <div className='App' style={{ minHeight: '100vh', background: '#f3f3f3' }}>
        {!window.location.href.includes('login') && !window.location.href.endsWith('/') && (
          <IdleTimer
            ref={(ref) => {
              this.idleTimer = ref;
            }}
            timeout={600000} // 10 minutes
            onIdle={this.handleOnIdle}
            debounce={250}
          />
        )}
        <Route path='/(home|user|professionalSession|students|schedule|new-student|meeting-instantly|meeting-for-later)/' component={Header} />
        <Switch>
          <Route exact path='(/login|/)' render={(props) => <Login {...props} />} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/professionalSession' component={ProfessionalSession} />
          <Route exact path='/studentSession/:roomId' component={StudentSession} />
          <Route exact path='/user' component={User} />
          <Route exact path='/students' component={Students} />
          <Route exact path='/new-student' component={NewStudent} />
          <Route exact path='/schedule' component={Schedule} />
          <Route exact path='/meeting-instantly' component={MeetingInstanly} />
          <Route exact path='/meeting-for-later' component={MeetingForLater} />
          <Route exact component={NoExist} />
        </Switch>
        <GlobalStyle />
      </div>
    );
  }
}

export default App;
