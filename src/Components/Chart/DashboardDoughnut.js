import React, { Component } from 'react'
import {Doughnut} from 'react-chartjs-2';

const data = {
	labels: [
		'FAT',
		'Protein',
		'Carbs'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#ff6384',
		'#b2ff9e',
		'#ffce56'
		],
		hoverBackgroundColor: [
		'#ffb0c0',
		'#e1ffd9',
		'#fff0cc'
		]
	}]
};

class DashboardDoughnut extends Component {
  render() {
    return (
      <div>
        <h5>Carb, Protein and Fat Breakdown</h5>
        <Doughnut 
            data={data}
            options={{
              legend: {
                display:false
              }
            }}
        />
      </div>
    );
  }
}
export default DashboardDoughnut