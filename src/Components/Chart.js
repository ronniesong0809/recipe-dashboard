import React, { Component } from 'react'
import Axios from 'axios'
import {Doughnut} from 'react-chartjs-2';

class Chart extends Component {
  displayName: 'DynamicDoughnutExample';

  constructor() {
    super();
    this.state = {
      name: [],
      calories: [],
      color:[]
    };
  }

  async search(searchText){
    const BASE_URL = 'https://trackapi.nutritionix.com/v2/natural/nutrients/'
    const postRequestConfig = {
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "x-app-id": "ec32a59d",
        "x-app-key": "d13ec612386c8937ed513fc295ad10e3"
      }
    }
    Axios.post(BASE_URL, {'query': searchText}, postRequestConfig )
    .then((res) => {
      if(res.data) {
        let tempName = []
        let tempCalories = []
        let tempColor = []
        console.log(res.data)
        res.data.foods.forEach(item => {
          tempName.push(item.food_name)
          tempCalories.push(item.nf_calories)
          tempColor.push('#' + Math.floor(Math.random()*16777215).toString(16))
        });
        this.setState({
          name: tempName,
          calories: tempCalories,
          color: tempColor
        })
      }
    })
    .catch(err => {
      console.log(err, 'failed to search for recipes.');
    })
  }

  async search2(){
    const BASE_URL = `https://trackapi.nutritionix.com/v2/search/instant?query=${this.props.searchText}`
    const headers= {
      'Content-Type': 'application/x-www-form-urlencoded',
      "x-app-id": "ec32a59d",
      "x-app-key": "d13ec612386c8937ed513fc295ad10e3"
    }
    Axios.get(BASE_URL, {headers})
    .then((res) => {
      if(res.data) {
        console.log(res.data)
      }
    })
    .catch(err => {
      console.log(err, 'failed to search for recipes.');
    })
  }

  componentDidMount(){
    let tempSearchText = ""
    this.props.recipes[0].recipe.ingredientLines.forEach(element => {
      console.log(element)
      tempSearchText += element + ', '
    });
    console.log(tempSearchText)
    this.search(tempSearchText)
    // this.search2()
  }

  render() {
    var data = {
      labels: this.state.name,
      datasets: [{
        data: this.state.calories,
        backgroundColor: this.state.color,
        hoverBackgroundColor: this.state.color
      }]
    };
    return (
      <div>{this.props.recipes[0].recipe.toString()}<Doughnut data={data} style={{maxHeight:"200px"}}/><hr/></div>
    )
  }
}

export default Chart