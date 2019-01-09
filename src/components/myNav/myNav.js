import React from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import Auth from '../pages/auth/auth';
import 'firebase/auth';
import './myNav.scss';

class MyNav extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
    login: PropTypes.func,
    logout: PropTypes.func,
  }

  // this bit of code is native to ReactStrap
  // It creates a dropdown on smaller screens
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    // this loads if user is not logged in
    if (!this.props.authed) {
      return (
        <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Nutshell React</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <Auth
              login={this.props.login}/>
            </Nav>
          </Collapse>
        </Navbar>
        </div>
      );
    }

    return (
      // this loads if user is logged in
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Nutshell React</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem
              className="selector"
              onClick={this.props.logout}
              >
                <NavLink>Sign Out</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNav;
