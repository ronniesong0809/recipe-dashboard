import React, { Component } from 'react'
import Axios from 'axios'
import {Form, FormControl, Card, CardDeck, Button, ListGroup, ListGroupItem} from 'react-bootstrap'


class Chart extends Component {
  constructor() {
    super();
    this.state = { 
      recipes: [],
      searchText: "chicken",
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
        <div className="Home">
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

            <br />
          </div>
          <CardDeck style={{display: 'grid', gridTemplateColumns: 'repeat(4, 24%)'}}>
            {this.state.recipes.map((item, item_key) => 
              <Card key={item_key} className="text-left">
                <Card.Img variant="top" src={item.recipe.image} />
                <Card.Header as="h5">{item.recipe.label}</Card.Header>
                <Card.Body>
                  <Card.Title>Calories: {item.recipe.calories}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Weight: {item.recipe.totalWeight}</Card.Subtitle>
                  <Card.Text>
                    Ingredient Lines: <br/>
                    {/* {item.recipe.ingredientLines} */}
                    {item.recipe.ingredientLines.map((ingredientLine, ingredientLines_key) => 
                      <p key={ingredientLines_key}> {ingredientLine}</p>
                    )}
                    <ListGroup className="list-group-flush">
                    {item.recipe.ingredients.map((ingredient, ingredient_key) => 
                      <ListGroupItem key={ingredient_key}> {ingredient.text} {ingredient.weight}</ListGroupItem>
                    )}
                    </ListGroup>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary" href={item.recipe.url}>Go {item.recipe.source}</Button>
                    <Button variant="primary" href={item.recipe.shareAs}>More Details</Button>
                  </Card.Footer>
              </Card>
            )}
          </CardDeck>
        </div>
    )
  }
}

export default Chart