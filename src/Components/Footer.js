import React, { Component } from 'react'
import {Navbar} from 'react-bootstrap'

class Footer extends Component {
  render() {
    return (
      <Navbar fixed="bottom" bg="dark" variant="dark" className="justify-content-center">
        <span style={{color:"white"}}>
            &copy; 2020 by <a href="https://www.github.com/ronniesong0809/dashboard">Ronnie Song</a>, All right reserved
        </span>
      </Navbar>
    )
  }
}

export default Footer