import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import initFirebase from '../helpers/initFirebase';
import MyNav from '../components/myNav/myNav';
import firebaeAuth from '../helpers/firebaeAuth';
import './App.scss';

class App extends Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    // this initiates the firebase application/methods
    initFirebase();
    // this checks the users login on page load and sets the state as such
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    // this removes the login checker when the component unmounts
    this.removeListener();
  }

  render() {
    const authedMsg = () => {
      // this will only display if the user is authenticated
      if (this.state.authed) {
        return (
          <div>
            <h3>You are authed!!!</h3>
            <button className="btn btn-success">success</button>
          </div>
        );
      }
      return '';
    };

    return (
      <div className="App">
        <MyNav
        login={firebaeAuth.login}
        logout={firebaeAuth.signOut}
        authed={this.state.authed}
        />
        {authedMsg()}
      </div>
    );
  }
}

export default App;
