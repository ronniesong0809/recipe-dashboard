

import React, { Component } from 'react'
import {HorizontalBar} from 'react-chartjs-2';

class DashboardHorizontal1 extends Component {
  render() {
    let name = []
    let calories = []
    let protein = []
    let sugars = []
    let carbohydrate = []
    let fat = []
    let sodium = []
    // console.log(this.props.nutrition)
    this.props.nutrition.forEach((item) =>{ 
      // console.log(item)
      name.push(item.food_name)
      carbohydrate.push(item.nf_total_carbohydrate)
      protein.push(item.nf_protein)
      fat.push(item.nf_total_fat)
      calories.push(item.nf_calories)
      sugars.push(item.nf_sugars)
      sodium.push(item.nf_sodium)
    })
    var data = {
      labels: name,
      datasets: [{
        label: "carbohydrate",
        data: carbohydrate,
        backgroundColor: 'rgba(255,206,86,0.5)',
        borderColor: 'rgba(255,206,86,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,206,86,0.8)',
        hoverBorderColor: 'rgba(255,206,86,1)',
      },{
        label: "protein",
        data: protein,
        backgroundColor: 'rgba(178,255,158,0.5)',
        borderColor: 'rgba(178,255,158,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(178,255,158,0.8)',
        hoverBorderColor: 'rgba(178,255,158,1)',
      },{
        label: "fat",
        data: fat,
        backgroundColor: 'rgba(255,99,132,0.5)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.8)',
        hoverBorderColor: 'rgba(255,99,132,1)',
      },{
        label: "calories",
        data: calories,
        backgroundColor: 'rgba(214,159,18,0.5)',
        borderColor: 'rgba(214,159,18,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(214,159,18,0.8)',
        hoverBorderColor: 'rgba(214,159,18,1)',
      },{
        label: "sugars",
        data: sugars,
        backgroundColor: 'rgba(159,18,214,0.5)',
        borderColor: 'rgba(159,18,214,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(159,18,214,0.8)',
        hoverBorderColor: 'rgba(159,18,214,1)',
      },{
        label: "sodium",
        data: sodium,
        backgroundColor: 'rgba(33,226,242,0.5)',
        borderColor: 'rgba(33,226,242,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(33,226,242,0.8)',
        hoverBorderColor: 'rgba(33,226,242,1)',
      }]
    };
    return (
      <div>
        <HorizontalBar data={data} />
      </div>
    );
  }
}

export default DashboardHorizontal1