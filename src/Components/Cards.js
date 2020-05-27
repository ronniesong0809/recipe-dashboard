import React, { Component } from 'react'
import {CardDeck} from 'react-bootstrap'
import Card from './Card'

class Cards extends Component {
  render() {
    return (
      <div className="Home">
        <CardDeck style={{display: 'grid', gridTemplateColumns: 'repeat(4, 24%)'}}>
          {this.props.recipes.map((item, item_key) => 
            <Card 
              key={item_key} 
              className="text-left"
              item={item}>
            </Card>
          )}
        </CardDeck>
      </div>
    )
  }
}

export default Cards