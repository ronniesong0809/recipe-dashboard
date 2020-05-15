import React, { Component } from 'react'
import Header from '../Components/Header'

class Home extends Component {
  render() {
    return (
      <div className="Site">
        <div className="Header">
          <Header />
        </div>
        
        <div className="Site-content">
            testing
        </div>
      </div>
    )
  }
}

export default Home