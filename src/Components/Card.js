import React, { Component } from 'react'
import {Card, Button} from 'react-bootstrap'

class Chart extends Component {
  render() {
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
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="secondary" href={this.props.item.recipe.url}>Go {this.props.item.recipe.source}</Button>
            <Button variant="primary" href={this.props.item.recipe.shareAs}>More Details</Button>
          </Card.Footer>
        </Card>
      </div>
    )
  }
}

export default Chart