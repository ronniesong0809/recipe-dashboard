import React, {Component} from 'react'
import {InputGroup, FormControl, Button, Jumbotron, Container, Card, Nav} from 'react-bootstrap'
import Axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBug, faSearch} from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import HomeLayout from './HomeLayout'
import DashboardBar from './Chart/DashboardBar'
import DashboardHorizontal from './Chart/DashboardHorizontal'
import DashboardHorizontal2 from './Chart/DashboardHorizontal2'
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
      displayCard: 1,
      nutrition: [],
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
  handleCardChange4 = () => {this.setState({displayCard: 4})};
  
  searchRecipe(){
    const BASE_URL = 'https://api.edamam.com/search?q='
    const key = '&app_id=9d0b7970&app_key=d9473a311a7f52d37a0450db0d0cc581'
    const params = '&from=0&to=9'
    let finalUrl = BASE_URL + this.state.searchText + key + params;
    // console.log(finalUrl)
    Axios.get(finalUrl)
    .then(async(res) => {
      if(res.data) {
        // console.log(res.data.hits)
        // console.log(res.data.hits[0].recipe.ingredients)
        this.setState({
          // recipes: res.data.hits[0].recipe.ingredients
          recipes: res.data.hits,
          isLoaded: true
        })
      }
      this.searchNutrition()
    })
    .catch(err => {
      console.log(err, 'failed to search for recipes.');
      this.setState({
        // recipes: res.data.hits[0].recipe.ingredients
        isLoaded: false
      })
      // alert(err + "!\nFailed to search for recipes.");
    })
  }

  searchNutrition(){
    // console.log(ingredients[0].recipe.ingredientsLines)
    let searchText = ""
    this.state.recipes[0].recipe.ingredientLines.forEach(element => {
      // console.log(element)
      searchText += element + ', '
    });
    const BASE_URL = 'https://trackapi.nutritionix.com/v2/natural/nutrients/'
    const id = "ec32a59d"
    const key = "d13ec612386c8937ed513fc295ad10e3"
    const config = {
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "x-app-id": id,
        "x-app-key": key
      }
    }
    Axios.post(BASE_URL, {'query': searchText}, config )
    .then((res) => {
      if(res.data) {
        this.setState({
          nutrition: res.data.foods
        })
      }
      // console.log("nutrition: ", this.state.nutrition)
    })
    .catch(err => {
      console.log(err, 'failed to search for recipes.');
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
    const params = "&location=portland&limit=10"
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
        // console.log(res.data)
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
      <HomeLayout isLoaded={this.state.isLoaded} recipes={this.state.recipes}>
        <Container className="my-5">
          <InputGroup size="lg">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-lg">
                <FontAwesomeIcon icon={faSearch}/>
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
              rel="noopener noreferrer"
              target="_blank"
            >
              <FontAwesomeIcon icon={faGithub}/> Learn More
            </Button>
            <Button 
              variant="btn btn-lg btn-outline-warning" 
              className="m-1" 
              href="https://github.com/ronniesong0809/dashboard/issues/new"
              rel="noopener noreferrer"
              target="_blank"
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
                    <Nav.Link eventKey="#Nutrition" onClick={this.handleCardChange2}>Nutrition</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="#Breakdown" onClick={this.handleCardChange3}>Breakdown</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="#Comparison" onClick={this.handleCardChange4}>Comparison</Nav.Link>
                  </Nav.Item>
                </Nav>
                </Card.Header>
                  {this.state.displayCard===1 &&
                    <DashboardHorizontal recipes={this.state.recipes} />
                  }
                  {this.state.displayCard===2 && 
                    <DashboardHorizontal2 nutrition={this.state.nutrition} />
                  }
                  {this.state.displayCard===3 &&
                    <DashboardDoughnut recipes={this.state.recipes} />
                  }
                  {this.state.displayCard===4 &&
                    <DashboardBar recipes={this.state.recipes}/>
                  }
                <Card.Footer>
                  <small className="text-muted">Charts</small>
                </Card.Footer>
              </Card>
            
            <section id="Cards" className="justify-content-md-center mx-0"><hr/>
              <Cards recipes={this.state.recipes} />
            </section>
            
            <section id="Map" className="justify-content-md-center"><hr/>
              <Card>
                <Map businesses={this.state.businesses}/>
                <Card.Footer>
                  <small className="text-muted">Map</small>
                </Card.Footer>
              </Card>
            </section>

            <section id="List" className="justify-content-md-center"><hr/>
              <Card>
                <List businesses={this.state.businesses} />
                <Card.Footer>
                  <small className="text-muted">List</small>
                </Card.Footer>
              </Card>
            </section>
          </Container>
        }
      </HomeLayout>
    )
  }
}

export default Body