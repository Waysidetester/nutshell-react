import firebase from 'firebase/app';
import firebaseApi from './db/firebaseApi';

const firebaseInit = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseApi);
  }
};

export default firebaseInit;
