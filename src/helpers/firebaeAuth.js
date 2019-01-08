import firebase from 'firebase/app';
import 'firebase/auth';

const login = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export default { login, signOut };
