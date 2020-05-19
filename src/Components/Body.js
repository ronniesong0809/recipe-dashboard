import React, { Component } from 'react'
import Axios from 'axios'

export default class Body extends Component {
  constructor() {
    super();
    this.state = { 
      recipes: [] 
    };
  }
  
  async componentDidMount() {
    const BASE_URL = 'https://api.edamam.com/search'
    const key = '&app_id=9d0b7970&app_key=d9473a311a7f52d37a0450db0d0cc581'
    let finalUrl = BASE_URL + '?q=chicken' + key + '&from=0&to=3';
    console.log(finalUrl)
    Axios.get(finalUrl)
    .then(async(res) => {
      if(res.data) {
        console.log(res.data.hits)
        console.log(res.data.hits[0].recipe.ingredients)
        await this.setState({recipes: res.data.hits[0].recipe.ingredients})
      }
    })
    .catch(err => {
      console.log(err, 'failed to search for recipes.');
    })
  }

  render() {
    return (
      <div className="Home">
          <div>
            <h2> testing </h2>
            {/* {this.state.recipes[0]} */}
          </div>
          {/* {this.state.recipes.map(el => (
          ))} */}
        </div>
    )
  }
}