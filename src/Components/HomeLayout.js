import React, { Component } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Map from './Map'

class HomeLayout extends Component {
  render() {
    return (
      <div className="Site">
        <div className="Header">
          <Header isLoaded={this.props.isLoaded}/>
        </div>
        <Map/>
        
        <div className="Site-content">
            {this.props.children}
        </div>
        
        <div className="Footer">
            <Footer />
        </div>
      </div>
    )
  }
}

export default HomeLayout