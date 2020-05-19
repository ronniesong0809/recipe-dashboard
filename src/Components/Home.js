import React, { Component } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Body from '../Components/Body'

class Home extends Component {
  render() {
    return (
      <div className="Site">
        <div className="Header">
          <Header />
        </div>
        
        <div className="Site-content">
          <Body />
        </div>
        
        <div className="Footer">
            <Footer />
        </div>
      </div>
    )
  }
}

export default Home