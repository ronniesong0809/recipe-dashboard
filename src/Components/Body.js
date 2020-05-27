import React, { Component } from 'react'
import Chart from './Chart'
import Map from './Map'
import List from './List'
import HomeLayout from './HomeLayout'
import Axios from 'axios'
import {Form, FormControl, Button} from 'react-bootstrap'

class Body extends Component {
  constructor() {
    super();
    this.state = { 
      recipes: [],
      searchText: "Chili crab",
    };
  }

  handleSearchInput = event => {
    this.setState({
      searchText: event.target.value
    });
  };

  handleSearchSubmit = event => {
    if (this.state.searchText) {
      this.search()
    } else {
      alert("Please enter some search text!");
    }
  };
  
  search(){
    const BASE_URL = 'https://api.edamam.com/search'
    const key = '&app_id=9d0b7970&app_key=d9473a311a7f52d37a0450db0d0cc581'
    let finalUrl = BASE_URL + '?q=' + this.state.searchText + key + '&from=0&to=20';
    console.log(finalUrl)
    Axios.get(finalUrl)
    .then(async(res) => {
      if(res.data) {
        console.log(res.data.hits)
        console.log(res.data.hits[0].recipe.ingredients)
        await this.setState({
          // recipes: res.data.hits[0].recipe.ingredients
          recipes: res.data.hits
        })
      }
    })
    .catch(err => {
      console.log(err, 'failed to search for recipes.');
    })
  }

  // async componentDidMount() {
  //   this.search()
  // }

  render() {
    return (
      <HomeLayout>
        <div>
          <br />
          <Form inline>
            <FormControl
            onChange={this.handleSearchInput}
            value={this.state.searchText}
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            />
            <Button onClick={this.handleSearchSubmit} variant="outline-info">
            Search
            </Button>
          </Form>

          <Chart recipes={this.state.recipes}/>
          <Map />
          <List />
        </div>
      </HomeLayout>
    )
  }
}

export default Body