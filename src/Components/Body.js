import React, { Component } from 'react'
import Cards from './Cards'
import Map from './Map'
import List from './List'
import HomeLayout from './HomeLayout'
import Axios from 'axios'
import {InputGroup, Form, FormControl, Button} from 'react-bootstrap'

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
          <InputGroup size="lg" style={{margin:"auto", width:"60%"}} className="mt-5 mb-5">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-lg">
                Enter a Recipe
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl 
              onChange={this.handleSearchInput}
              type="text"
              placeholder={this.state.searchText}
              aria-label="Large" 
              aria-describedby="inputGroup-sizing-lg" 
            />
            <InputGroup.Append>
              <Button onClick={this.handleSearchSubmit} variant="outline-secondary">Search</Button>
            </InputGroup.Append>
          </InputGroup>

          <section id="Card">
            <Cards recipes={this.state.recipes} />
          </section>
          
          <section id="Map">
            <Map recipes={this.state.recipes} />
          </section>
          
          <section id="List">
            <List recipes={this.state.recipes} />
          </section>
        </div>
      </HomeLayout>
    )
  }
}

export default Body