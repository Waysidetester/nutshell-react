import firebase from 'firebase/app';
import firebaseApi from './db/firebaseApi';

// function to start firebase app. Called in App.js componentDidMount under this.removeListener
const firebaseInit = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseApi);
  }
};

export default firebaseInit;
