import React, { Component } from 'react'
import Chart from './Chart'
import Map from './Map'
import List from './List'
import HomeLayout from './HomeLayout'

class Body extends Component {
  render() {
    return (
      <HomeLayout>
        <div>
            <Chart />
            <Map />
            <List />
        </div>
      </HomeLayout>
    )
  }
}

export default Body