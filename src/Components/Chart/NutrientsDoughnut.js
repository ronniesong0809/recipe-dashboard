import React, { Component } from 'react'
import {Doughnut} from 'react-chartjs-2';

class DoughnutChart extends Component {
  render() {
    let data = {
      labels: [
        'Carbohydrates',
        'Protein',
        'Fat'
      ],
      datasets: [{
        data: [
          this.props.data.CHOCDF.quantity,
          this.props.data.PROCNT.quantity,
          this.props.data.FAT.quantity
        ],
        backgroundColor: [
          '#ffce56',
          '#b2ff9e',
          '#ff6384',
        ],
        hoverBackgroundColor: [
          '#fff0cc',
          '#e1ffd9',
          '#ffb0c0',
        ]
      }]
    }
    return (
      <div>
        <h5>Carb, Protein and Fat Breakdown</h5>
        <Doughnut 
            data={data}
            options={{
              legend: {
                display:true
              }
            }}
        />
      </div>
    );
  }
}
export default DoughnutChart