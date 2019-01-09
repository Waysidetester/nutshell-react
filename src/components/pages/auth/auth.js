import React from 'react';
import {
  NavItem,
  NavLink,
} from 'reactstrap';
import fbAuth from '../../../helpers/firebaeAuth';
import './auth.scss';

class Auth extends React.Component {
  authenticate = (e) => {
    e.preventDefault();
    fbAuth.login()
      .then(() => {
        this.props.history.push('/home');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <NavItem
      className="selector"
      onClick={this.authenticate}
      >
        <NavLink>Login With Google</NavLink>
      </NavItem>
    );
  }
}

export default Auth;
