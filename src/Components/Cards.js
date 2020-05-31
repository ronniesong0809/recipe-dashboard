import React, { Component } from 'react'
import {CardDeck} from 'react-bootstrap'
import Card from './Card'

class Cards extends Component {
  render() {
    return (
      <CardDeck style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'}}>
        {this.props.recipes.map((item, item_key) => 
          <Card 
            key={item_key} 
            className="text-left"
            item={item}>
          </Card>
        )}
      </CardDeck>
    )
  }
}

export default Cards