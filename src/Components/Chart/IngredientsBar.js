import React, { Component } from 'react'
import {HorizontalBar} from 'react-chartjs-2';

class IngredientsBar extends Component {
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
    // let tempColor = []
    this.props.data.forEach((item) =>{ 
      tempKeys.push(item.text)
      tempValues.push(item.weight)
      // tempColor.push('#' + Math.floor(Math.random()*16777215).toString(16))
    })
    this.setState({
      keys: tempKeys,
      values: tempValues,
      // color: tempColor
    })
	}

  render() {
    var data = {
      labels: this.state.keys,
      datasets: [{
        label: "weight(g)",
        data: this.state.values,
        backgroundColor: 'rgba(99, 210, 255, 0.2)',
        borderColor: 'rgba(99, 210, 255, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(99, 210, 255, 0.4)',
        hoverBorderColor: 'rgba(99, 210, 255, 1)',
      }]
    };
    return (
      <div>
        <h5>Ingredients</h5>
        <HorizontalBar data={data} />
      </div>
    );
  }
}

export default IngredientsBar