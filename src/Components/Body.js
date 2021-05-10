import React, {Component} from 'react'
import {InputGroup, FormControl, Button, Jumbotron, Container, Card, Nav, Alert, OverlayTrigger, Tooltip} from 'react-bootstrap'
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
      isError: false,
      errorMessage: "",
    };
  }

  handleSearchInput = event => {
    // console.log(this.state.interval)
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
  handleKeyDown = (e) => {
    if (e.key === "Enter"){
      this.handleSearchSubmit()
    }
  }
  setShow = () =>{this.setState({isError: false})};
  
  searchRecipe(){
    const base = "https://api.edamam.com/search?q="
    const key = "&app_id=" + process.env.REACT_APP_EDAMAM_ID + "&app_key=" + process.env.REACT_APP_EDAMAM_KEY
    const from = "0"
    const to = "9"
    // console.log(key)
    let finalUrl = base + this.state.searchText + key + "&from=" + from + "&to=" + to;
    Axios.get(finalUrl)
    .then(async(res) => {
      if(res.data && res.data.count!==0) {
        // console.log(res.data.hits)
        // console.log(res.data.hits[0].recipe.ingredients)
        this.setState({
          // recipes: res.data.hits[0].recipe.ingredients
          recipes: res.data.hits,
          isLoaded: true,
          isError: false,
        })
        this.searchNutrition()
      }else{
        this.setState({
          isLoaded: false,
          isError: true,
          errorMessage: "0 found!"
        })
      }
    })
    .catch(err => {
      console.log(err, ", failed to search for recipes.");
      this.setState({
        // recipes: res.data.hits[0].recipe.ingredients
        isLoaded: false,
        isError: true,
        errorMessage: err
      })
      // alert(err + "!\nFailed to search for recipes.");
    })
  }

  searchNutrition(){
    // console.log(ingredients[0].recipe.ingredientsLines)
    let searchText = ""
    this.state.recipes[0].recipe.ingredientLines.forEach(element => {
      // console.log(element)
      searchText += element + ", "
    });
    const base = "https://trackapi.nutritionix.com/v2/natural/nutrients/"
    const config = {
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "x-app-id": process.env.REACT_APP_NUTRITIONIX_ID,
        "x-app-key": process.env.REACT_APP_NUTRITIONIX_KEY
      }
    }
    Axios.post(base, {"query": searchText}, config )
    .then((res) => {
      if(res.data) {
        this.setState({
          nutrition: res.data.foods
        })
        // console.log("nutrition: ", this.state)
      }else{
        this.setState({
          isLoaded: false,
          isError: true,
          errorMessage: "0 found!"
        })
      }
    })
    .catch(err => {
      console.log(err, ", failed to search for nutrition.");
      this.setState({
        isLoaded: false,
        isError: true,
        errorMessage: err
      })
      // alert(err + "!\nFailed to search for nutrition.");
    })
  }

  randomRecipe(){
    this.setState({
      searchText: this.state.searchTextList[Math.floor(Math.random() * Object.keys(this.state.searchTextList).length)]
    })
    // console.log(this.state.searchTextList[Math.floor(Math.random() * Object.keys(this.state.searchTextList).length)])
  }

  searchLocation(){
    const proxy = "https://unblock-cors.herokuapp.com/"
    const base = "https://api.yelp.com/v3/businesses/search?term="
    const location = "portland"
    const limit = "10"
    const key = "Bearer " + process.env.REACT_APP_YELP_KEY
    const url = proxy + base + this.state.searchText + "&location=" + location + "&limit=" + limit
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
      }else{
        this.setState({
          isLoaded: false,
          // isError: true,
          errorMessage: "0 found!"
        })
      }
    })
    .catch(err => {
      console.log(err, ", failed to search for restaurants.");
      this.setState({
        isLoaded: false,
        isError: true,
        errorMessage: err
      })
      // alert(err + "!\nFailed to search for restaurants.");
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
              <OverlayTrigger placement="left" 
                overlay={<Tooltip>Please enter a recipe!</Tooltip>}
              >
                <InputGroup.Text id="inputGroup-sizing-lg">
                  <FontAwesomeIcon icon={faSearch}/>
                </InputGroup.Text>
              </OverlayTrigger>
            </InputGroup.Prepend>
            <FormControl 
              onChange={this.handleSearchInput}
              type="text"
              placeholder={this.state.searchText}
              aria-label="Large" 
              aria-describedby="inputGroup-sizing-lg"
              onKeyDown={this.handleKeyDown}
            />
            <InputGroup.Append>
              <OverlayTrigger 
                placement="right" 
                overlay={<Tooltip>Click ME!</Tooltip>}
              >
                <Button onClick={this.handleSearchSubmit} variant="outline-secondary">Search</Button>
              </OverlayTrigger>
            </InputGroup.Append>
          </InputGroup>
          {this.state.isError && 
          <Alert className="justify-content-md-center mt-1" variant="danger">
            <Alert.Heading>Oops! Something went wrong.</Alert.Heading>
            {this.state.errorMessage.toString()}
          </Alert>}
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
