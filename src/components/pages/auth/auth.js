import React from 'react';
import {
  NavItem,
  NavLink,
} from 'reactstrap';
import './auth.scss';

class Auth extends React.Component {
  authenticate = () => {
    this.props.login()
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
      onClick={this.props.login}
      >
        <NavLink>Login With Google</NavLink>
      </NavItem>
    );
  }
}

export default Auth;
