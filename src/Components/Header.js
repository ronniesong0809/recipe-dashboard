import React, { Component } from 'react'
import {Navbar} from 'react-bootstrap'
import { ReactComponent as Logo } from './logo.svg';

class Headers extends Component {
  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">
          <Logo fill="white" src="/logo.svg" width="30" height="30" className="d-inline-block align-top" />{' '}
          Recipes Dashboard
        </Navbar.Brand>
      </Navbar>
    
    )
  }
}

export default Headers