import React, {Component} from 'react'
import {InputGroup, FormControl, Button, Jumbotron, Container, Row, Col, Card, Nav, Figure} from 'react-bootstrap'
import Axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBug} from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import HomeLayout from './HomeLayout'
import DashboardBar from './Chart/DashboardBar'
import DashboardHorizontal from './Chart/DashboardHorizontal'
import DashboardDoughnut from './Chart/DashboardDoughnut'
import Cards from './Cards'
import Map from './Map'
import List from './List'

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
        "Sour Cream Chip Muffins", 
        "Onion Beef au Jus"],
      searchText: "",
      isLoaded: false,
      interval: 0,
      businesses: [],
      displayCard: 1
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
      this.searchRecipe()
      this.searchLocation()
    } else {
      alert("Please enter some search text!");
    }
  };

  handleCardChange1 = () => {this.setState({displayCard: 1})};
  handleCardChange2 = () => {this.setState({displayCard: 2})};
  handleCardChange3 = () => {this.setState({displayCard: 3})};
  
  
  searchRecipe(){
    const BASE_URL = 'https://api.edamam.com/search'
    const key = '&app_id=9d0b7970&app_key=d9473a311a7f52d37a0450db0d0cc581'
    let finalUrl = BASE_URL + '?q=' + this.state.searchText + key + '&from=0&to=20';
    // console.log(finalUrl)
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
    // console.log(this.state.searchTextList[Math.floor(Math.random() * Object.keys(this.state.searchTextList).length)])
  }

  searchLocation(){
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const base = "https://api.yelp.com/v3/businesses/search?term="
    const params = "&location=portland&limit=3"
    const key = "Bearer 4mP1pGrwFpbuMXBoiIMkrGRA6WmtaU9boasPYOT-bvEZ0bi7xTl7lr6uXHORbbvWG4CsJwUY-bRLCvTRqyCYmKLKhWZ3Hsg7fWiKIAXM3BkETbtGtD7_8U-afM3uXXYx"
    const url = proxy + base + this.state.searchText + params
    const config = { 
      headers: {
        "accept": "application/json",
        "x-requested-with": "xmlhttprequest",
        "Access-Control-Allow-Origin":"*",
        "Authorization": key
      }
    }

    Axios.get(url, config)
    .then((res) => {
      if(res.data) {
        this.setState({
          businesses: res.data.businesses
        })
      }
    })
    .catch(err => {
      console.log(err, "failed to search.");
    })
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
        <Container className="my-5">
          <InputGroup size="lg">
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
        </Container>

        {!this.state.isLoaded &&
          <Container><Jumbotron fluid>
            <h1>Welcome!</h1>
            <p>This is a simple dashboard that allows its users to search an recipe.</p>
            <Button 
              variant="btn btn-lg btn-outline-dark" 
              className="m-1" 
              href="https://github.com/ronniesong0809/dashboard"
            >
              <FontAwesomeIcon icon={faGithub}/> Learn More
            </Button>
            <Button 
              variant="btn btn-lg btn-outline-warning" 
              className="m-1" 
              href="https://github.com/ronniesong0809/dashboard/issues/new"
            >
              <FontAwesomeIcon icon={faBug}/> Submit a Bug
            </Button>
          </Jumbotron></Container>
        }

        {this.state.isLoaded && 
          <Container>
            <section id="Charts" className="justify-content-md-center"><hr/></section>
              <Card>
                <Card.Header>
                <Nav variant="tabs" defaultActiveKey="#Ingredients">
                  <Nav.Item>
                    <Nav.Link eventKey="#Ingredients" onClick={this.handleCardChange1}>Ingredients</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="#Comparison" onClick={this.handleCardChange2}>Comparison</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="#Breakdown" onClick={this.handleCardChange3}>Breakdown</Nav.Link>
                  </Nav.Item>
                </Nav>
                </Card.Header>
                  {this.state.displayCard===1 && 
                    <DashboardHorizontal recipes={this.state.recipes}/>
                  }
                  {this.state.displayCard===2 &&
                    <DashboardBar recipes={this.state.recipes}/>
                  }
                  {this.state.displayCard===3 &&
                    <DashboardDoughnut recipes={this.state.recipes} />
                  }
                <Card.Footer>
                  <small className="text-muted">Carbs, Protein, Fat</small>
                </Card.Footer>
              </Card>
            
            
            <section id="Map" className="justify-content-md-center"><hr/>
              <Card>
                <Map businesses={this.state.businesses}/>
                <Card.Footer>
                  <small className="text-muted">Map</small>
                </Card.Footer>
              </Card>
            </section>
          
            <section id="Cards" className="justify-content-md-center mx-0"><hr/>
              <Cards recipes={this.state.recipes} />
            </section>
            
            <section id="List" className="justify-content-md-center"><hr/>
              <List recipes={this.state.recipes} />
            </section>
          </Container>
        }
      </HomeLayout>
    )
  }
}

export default Body