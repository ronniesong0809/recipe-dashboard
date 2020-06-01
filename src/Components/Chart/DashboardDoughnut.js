import React, { Component } from 'react'
import {Doughnut} from 'react-chartjs-2';

class DashboardDoughnut extends Component {
  render() {
    let data = {
      labels: [
        'FAT',
        'Protein',
        'Carbs'
      ],
      datasets: [{
        data: [
          this.props.recipes[0].recipe.totalNutrients.CHOCDF.quantity,
          this.props.recipes[0].recipe.totalNutrients.PROCNT.quantity,
          this.props.recipes[0].recipe.totalNutrients.FAT.quantity
        ],
        backgroundColor: ['rgba(255,206,86,0.5)', 'rgba(178,255,158,0.5)', 'rgba(255,99,132,0.5)'],
        borderColor: ['rgba(255,206,86,1)', 'rgba(178,255,158,1)', 'rgba(255,99,132,1)'],
        borderWidth: 1,
        hoverBackgroundColor: ['rgba(255,206,86,0.8)', 'rgba(178,255,158,0.8)', 'rgba(255,99,132,0.8)'],
        hoverBorderColor: ['rgba(255,206,86,1)', 'rgba(178,255,158,1)', 'rgba(255,99,132,1)'],
      }]
    };
    return (
      <div>
        <Doughnut data={data} />
      </div>
    );
  }
}
export default DashboardDoughnut