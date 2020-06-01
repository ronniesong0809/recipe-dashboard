import React, { Component } from 'react'
import {HorizontalBar} from 'react-chartjs-2';

class DashboardHorizontal extends Component {
  constructor(props){
    super(props);
    this.state = {
      keys: [],
      values: [],
      color:[]
    }
  }

  componentDidMount() {
    let tempKeys = []
    let tempValues = []
    // let tempColor = []
    this.props.recipes[0].recipe.ingredients.forEach((item) =>{ 
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

export default DashboardHorizontal