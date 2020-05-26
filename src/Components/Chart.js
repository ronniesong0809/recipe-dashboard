import React, { Component } from 'react'
import Axios from 'axios'
import {Form, FormControl, Button} from 'react-bootstrap'

class Chart extends Component {
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
        await this.setState({
          recipes: res.data.hits[0].recipe.ingredients
        })
      }
    })
    .catch(err => {
      console.log(err, 'failed to search for recipes.');
    })
  }

  render() {
    // let stats = {
    //   text: null,
    //   weight: 0,
    // }
    // this.state.recipes.forEach(e => {
    //   if(!stats.name)  {
    //     stats.text = e.text
    //   }
    //   stats.weight = e.weight
    // })

    return (
        <div className="Home">
          
          {this.state.recipes.map(i => 
            <div> {i.text} {i.weight}</div>
          )}
        </div>
    )
  }
}

export default Chart