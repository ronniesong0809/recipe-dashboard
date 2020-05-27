import React, { Component } from 'react'
import {Doughnut} from 'react-chartjs-2';
// import './Card.css'

class IngredientsChart extends Component {
  displayName: 'DynamicDoughnutExample';
  
  constructor(props){
    super(props);
    this.state = {
      keys: [],
      values: []
    }
  }

  componentDidMount() {
    let tempKeys = []
    let tempValues = []
    this.props.data.forEach((item) =>{ 
      tempKeys.push(item.text)
      tempValues.push(item.weight)
    })
    this.setState({
      keys: tempKeys,
      values: tempValues
    })
	};

  render() {
    var data = {
      labels: this.state.keys,
      datasets: [{
        data: this.state.values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ]
      }]
    };
    return (
      <div>
        <h2>Dynamicly refreshed Doughnut Example</h2>
        <Doughnut data={data} />
      </div>
    );
  }
}

export default IngredientsChart