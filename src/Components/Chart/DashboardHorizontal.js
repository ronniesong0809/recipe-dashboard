

import React, { Component } from 'react'
import {HorizontalBar} from 'react-chartjs-2';

class DashboardHorizontal extends Component {
  render() {
    let tempKeys = []
    let tempValues = []
    this.props.recipes[0].recipe.ingredients.forEach((item) =>{ 
      tempKeys.push(item.text)
      tempValues.push(item.weight)
    })
    var data = {
      labels: tempKeys,
      datasets: [{
        label: "weight(g)",
        data: tempValues,
        backgroundColor: 'rgba(99, 210, 255, 0.2)',
        borderColor: 'rgba(99, 210, 255, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(99, 210, 255, 0.4)',
        hoverBorderColor: 'rgba(99, 210, 255, 1)',
      }]
    };
    return (
      <div>
        <HorizontalBar data={data} />
      </div>
    );
  }
}

export default DashboardHorizontal