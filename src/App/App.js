import React from 'react';
import firebase from 'firebase/app';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import 'firebase/auth';
import Auth from '../components/pages/auth/auth';
import Home from '../components/pages/home/home';
import Articles from '../components/pages/articles/articles';
import Events from '../components/pages/events/events';
import Friends from '../components/pages/friends/friends';
import Messages from '../components/pages/messages/messages';
import Weather from '../components/pages/weather/weather';
import initFirebase from '../helpers/initFirebase';
import MyNav from '../components/myNav/myNav';
import firebaeAuth from '../helpers/firebaeAuth';
import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (
    !authed ? (<Component { ...props }/>) : (<Redirect to={{ pathname: '/home', state: { from: props.location } }}/>)
  );
  return <Route {... rest} render={props => routeChecker(props)}/>;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (
    authed ? (<Component { ...props }/>) : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }}/>)
  );
  return <Route {... rest} render={props => routeChecker(props)}/>;
};

class App extends React.Component {
  state = {
    authed: false,
    pendingUser: true,
  }

  componentDidMount() {
    // this initiates the firebase application/methods
    initFirebase();
    // this checks the users login on page load and sets the state as such
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true, pendingUser: false });
      } else {
        this.setState({ authed: false, pendingUser: false });
      }
    });
  }

  componentWillUnmount() {
    // this removes the login checker when the component unmounts
    this.removeListener();
  }

  render() {
    if (this.state.pendingUser) {
      return null;
    }

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNav
            login={firebaeAuth.login}
            logout={firebaeAuth.signOut}
            authed={this.state.authed}
            />
            <div className='container'>
              <div className='row'>
                <Switch>
                  <PublicRoute path='/auth' component={Auth} authed={this.state.authed}/>
                  <PrivateRoute path='/friends' component={Friends} authed={this.state.authed} />
                  <PrivateRoute path='/weather' component={Weather} authed={this.state.authed} />
                  <PrivateRoute path='/events' component={Events} authed={this.state.authed} />
                  <PrivateRoute path='/messages' component={Messages} authed={this.state.authed} />
                  <PrivateRoute path='/articles' component={Articles} authed={this.state.authed} />
                  <PrivateRoute path='/home' component={Home} authed={this.state.authed} />
                  <PrivateRoute path='/' exact component={Home} authed={this.state.authed} />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
