import React, { Component } from 'react'
import {Navbar, NavbarBrand} from 'react-bootstrap'

class Footer extends Component {
  render() {
    return (
      <Navbar fixed="bottom" bg="primary" variant="dark" className="justify-content-center">
        <NavbarBrand>
            &copy; 2020 by <a href="https://www.github.com/ronniesong0809/scanner-webapp" style={{color:"gray"}}>Ronnie Song</a>, All right reserved
        </NavbarBrand>
      </Navbar>
    )
  }
}

export default Footer