import React, { Component } from 'react'
import {Doughnut} from 'react-chartjs-2';
// import './Card.css'

class IngredientsChart extends Component {
  displayName: 'DynamicDoughnutExample';
  
  constructor(props){
    super(props);
    this.state = {
      keys: [],
      values: [],
      color:[]
    }
  }

  random_color() {
    var r = Math.floor(Math.random() * 256)
    var g = Math.floor(Math.random() * 256)
    var b = Math.floor(Math.random() * 256)
    // var alpha = Math.random()
    var alpha = Math.random() * (0.90 - 0.6) + 0.6 // 0.6~0.9
    var color = "rgba(" + r + "," + g + "," + b + "," + alpha + ")"
    console.log(color)
    return color
  }

  componentDidMount() {
    let tempKeys = []
    let tempValues = []
    let tempColor = []
    this.props.data.forEach((item) =>{ 
      tempKeys.push(item.text)
      tempValues.push(item.weight)
      tempColor.push('#' + Math.floor(Math.random()*16777215).toString(16))
    })
    this.setState({
      keys: tempKeys,
      values: tempValues,
      color: tempColor
    })
	};

  render() {
    var data = {
      labels: this.state.keys,
      datasets: [{
        data: this.state.values,
        backgroundColor: this.state.color,
        hoverBackgroundColor: this.state.color
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