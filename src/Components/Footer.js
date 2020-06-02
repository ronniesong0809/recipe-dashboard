import React, { Component } from 'react'
import {Navbar} from 'react-bootstrap'

class Footer extends Component {
  render() {
    return (
      <Navbar sticky="bottom" variant="light" className="justify-content-center">
        <span>
          &copy; 2020 by <a href="https://www.github.com/ronniesong0809/dashboard" rel="noopener noreferrer" target="_blank">Ronnie Song</a>, All right reserved
        </span>
      </Navbar>
    )
  }
}

export default Footer