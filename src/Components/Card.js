import React, { Component } from 'react'
import {Card, Button, Modal} from 'react-bootstrap'
import NutrientsDoughnut from './Chart/NutrientsDoughnut'
import IngredientsBar from './Chart/IngredientsBar';
import './stylesheet.css'

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
      <Card className="text-left my-3">
        <Card.Img variant="top" src={this.props.item.recipe.image} />
        <Card.Header className="card-header-labels">
          {this.props.item.recipe.healthLabels.map((healthLabels, healthLabels_key) => 
            <span key={healthLabels_key}>{(healthLabels_key ? ' | ': '')} {healthLabels} </span>
          )}
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <a href={this.props.item.recipe.url} rel="noopener noreferrer" target="_blank" className="card-title-source">{this.props.item.recipe.source}</a><br/>
            {this.props.item.recipe.label}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <b>{(this.props.item.recipe.calories/this.props.item.recipe.yield).toFixed(0)}</b> Calories | <b>{this.props.item.recipe.ingredientLines.length}</b> Ingredients
          </Card.Subtitle>
          <Card.Text className="mt-2 card-text">
            <b>Ingredients:</b> {this.props.item.recipe.ingredientLines}.<br/>
            <a href={this.props.item.recipe.shareAs} rel="noopener noreferrer" target="_blank">Read More</a>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" onClick={handleShow}>See Chart</Button>{' '}
          <Button variant="primary" href={this.props.item.recipe.url} rel="noopener noreferrer" target="_blank">Instructions</Button>
        </Card.Footer>
        <Modal 
          show={this.state.show} 
          onHide={handleClose}
          className="modal-90w"
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.item.recipe.label}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NutrientsDoughnut data={this.props.item.recipe.totalNutrients}/><hr/>
            <IngredientsBar data={this.props.item.recipe.ingredients}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    )
  }
}

export default Chart