import React, { Component } from 'react'
import BarChart from './Chart/DashboardBar'
import DoughnutChart from './Chart/DashboardDoughnut'
import Cards from './Cards'
import Map from './Map'
import List from './List'
import HomeLayout from './HomeLayout'
import Axios from 'axios'
import {InputGroup, FormControl, Button, Jumbotron, Container, Row, Col, Card} from 'react-bootstrap'

class Body extends Component {
  constructor() {
    super();
    this.state = { 
      recipes: [],
      searchTextList: [
        "Chili crab", 
        "Seafood paella", 
        "Chicken rice", 
        "Parma ham", 
        "Shish kebab", 
        "Buffalo Chicken Dip", 
        "Mini Caramel Rolls", 
        "Pepper Poppers", 
        "Sour Cream Chip Muffins", 
        "Onion Beef au Jus"],
      searchText: "",
      isLoaded: false,
      interval: 0
    };
  }

  handleSearchInput = event => {
    console.log(this.state.interval)
    clearInterval(this.state.interval)
    this.setState({
      searchText: event.target.value
    });
  };

  handleSearchSubmit = () => {
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
          recipes: res.data.hits,
          isLoaded: true
        })
      }
    })
    .catch(err => {
      console.log(err, 'failed to search for recipes.');
      this.setState({
        // recipes: res.data.hits[0].recipe.ingredients
        isLoaded: false
      })
      alert(err + "!\nFailed to search for recipes.");
    })
  }

  randomRecipe(){
    this.setState({
      searchText: this.state.searchTextList[Math.floor(Math.random() * Object.keys(this.state.searchTextList).length)]
    })
    console.log(this.state.searchTextList[Math.floor(Math.random() * Object.keys(this.state.searchTextList).length)])
  }

  componentDidMount() {
    this.randomRecipe()
    this.setState({
      interval: setInterval(() => {
        this.randomRecipe()    
      }, 5000)
    })
	}

  render() {
    return (
      <HomeLayout isLoaded={this.state.isLoaded}>
        <div style={{height:"100%"}}>
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

          {!this.state.isLoaded &&
            <Jumbotron fluid>
              <h1>Welcome!</h1>
              <p>This is a simple dashboard.</p>
              <p><Button variant="primary" href="https://github.com/ronniesong0809/dashboard">Learn more</Button></p>
            </Jumbotron>
          }

          {this.state.isLoaded && 
            <Container>
              <Row className="justify-content-md-center mb-5">
                <Col md className="m-1">
                  <Card id="Chart">
                    <BarChart recipes={this.state.recipes} />
                  </Card>
                </Col>
                
                <Col md className="m-1">
                  <Card id="Chart">
                    <DoughnutChart recipes={this.state.recipes} />
                  </Card>
                </Col>

                <Col md className="m-1">
                  <Card id="Chart">
                    <DoughnutChart recipes={this.state.recipes} />
                  </Card>
                </Col>
              </Row>

              <Row className="justify-content-md-center y-5">
                <Col>
                  <section id="Map">
                    <Map searchText={this.state.searchText}/>
                  </section>
                </Col>
              </Row>
              
              <Row className="justify-content-md-center y-5">
                <section id="Card">
                  <Cards recipes={this.state.recipes} />
                </section>
              </Row>

              <Row className="justify-content-md-center y-5">
                <section id="List">
                  <List recipes={this.state.recipes} />
                </section>
              </Row>
            </Container>
          }
        </div>
      </HomeLayout>
    )
  }
}

export default Body