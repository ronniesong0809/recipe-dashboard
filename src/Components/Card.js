import React, { Component } from 'react'
import {Card, Button, Modal} from 'react-bootstrap'
import IngredientsChart from './IngredientsChart'

class Chart extends Component {
  constructor() {
    super();
    this.state = { 
      show: false
    };
  }

  render() {
    const handleClose = () => {
      this.setState({
        show: false
      });
    }
    
    const handleShow = (x) => {
      this.setState({
        show: true,
        ingredients: x
      });
    }
    
    return (
        <div className="Home">
          <Card className="text-left">
            <Card.Img variant="top" src={this.props.item.recipe.image} />
            <Card.Header as="h5">{this.props.item.recipe.label}</Card.Header>
            <Card.Body>
              <Card.Title as="h6">Calories: {this.props.item.recipe.calories}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Weight: {this.props.item.recipe.totalWeight}</Card.Subtitle>
              <Card.Text>
                <br/>Ingredient Lines:
                {this.props.item.recipe.ingredientLines.map((ingredientLine, ingredientLines_key) => 
                  <span key={ingredientLines_key}> {ingredientLine}, </span>
                )}<br/>
                <Button variant="primary" onClick={handleShow}>
                  Read More
                </Button>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="secondary" href={this.props.item.recipe.url} className="mr-sm-2">Go {this.props.item.recipe.source}</Button>
              <Button variant="primary" href={this.props.item.recipe.shareAs}>More Details</Button>
            </Card.Footer>
          </Card>

          <Modal 
            show={this.state.show} 
            onHide={handleClose}
            className="modal-90w"
          >
            <Modal.Header closeButton>
              <Modal.Title>{this.props.item.recipe.label}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <IngredientsChart data={this.props.item.recipe.ingredients}/>
              {this.props.item.recipe.ingredients.map((ingredient, ingredient_key) => 
                <span key={ingredient_key}> {ingredient.text} {ingredient.weight}<br/></span>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
    )
  }
}

export default Chart