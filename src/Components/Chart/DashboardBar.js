import React, { Component } from 'react'
import {Bar} from 'react-chartjs-2';

class DashboardBar extends Component {
  render() {
    var data = []
    let tempName = []
    let tempCarbs = []
    let tempProtein = []
    let tempFat = []
    this.props.recipes.slice(0,3).forEach((item) =>{
      tempName.push(item.recipe.label)
      tempCarbs.push(item.recipe.totalNutrients.CHOCDF.quantity)
      tempProtein.push(item.recipe.totalNutrients.PROCNT.quantity)
      tempFat.push(item.recipe.totalNutrients.FAT.quantity)
    })

    data = {
      labels: tempName,
      datasets: [
        {
          label: 'Carbohydrates',
          backgroundColor: 'rgba(255,206,86,0.5)',
          borderColor: 'rgba(255,206,86,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,206,86,0.8)',
          hoverBorderColor: 'rgba(255,206,86,1)',
          data: tempCarbs
        },{
          label: 'Protein',
          backgroundColor: 'rgba(178,255,158,0.5)',
          borderColor: 'rgba(178,255,158,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(178,255,158,0.8)',
          hoverBorderColor: 'rgba(178,255,158,1)',
          data: tempProtein
        },{
          label: 'Fat',
          backgroundColor: 'rgba(255,99,132,0.5)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.8)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: tempFat
        }
      ]
    };
    return (
      <div>
        <Bar data={data} />
      </div>
    )
  }
}

export default DashboardBar