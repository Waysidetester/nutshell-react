import firebase from 'firebase/app';
import 'firebase/auth';

// firebase login method
const login = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

// firebase logout method
const signOut = () => {
  firebase.auth().signOut();
};

export default { login, signOut };
