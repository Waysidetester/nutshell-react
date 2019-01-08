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
    initFirebase();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  render() {
    const authedMsg = () => {
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
        <MyNav login={firebaeAuth.login} logout={firebaeAuth.signOut} authed={this.state.authed}/>
        {authedMsg()}
      </div>
    );
  }
}

export default App;
