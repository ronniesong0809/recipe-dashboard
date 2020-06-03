import React, {Component} from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import {Media} from 'react-bootstrap';
import './stylesheet.css'

class MyMap extends Component {
  render() {
    let portland = [45.5135, -122.6801]
    return (
      <Map center={portland} zoom={13}>
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {this.props.businesses.map((item, i_key) =>
          <Marker key={i_key} position={[item.coordinates.latitude, item.coordinates.longitude]}>
            <Popup position={[item.coordinates.latitude, item.coordinates.longitude]} maxHeight="30px">
              <Media>
                <img
                  width={64}
                  className="mr-3"
                  alt={item.name}
                  src={item.image_url}
                />
                <Media.Body>
                  <h5>{item.name}</h5>
                  <span className="card-title-source">
                    <b>{item.price} - </b>
                    {item.categories.map((category, c_key) =>
                      <span key={c_key}>{(c_key ? ' | ': '')}{category.title}</span>
                    )}
                  </span><br/>
                  <span><b>{item.rating}</b> Stars from <b>{item.review_count}</b> <a href={item.url} rel="noopener noreferrer" target="_blank" className="card-title-source">reviews</a></span><br/>
                  <p><b>Location:</b> {item.location.display_address[0]} {item.location.display_address[1]} {item.location.display_address[2]}</p>
                </Media.Body>
              </Media>
            </Popup>
          </Marker>
        )}
      </Map>    
    )
  }
}

export default MyMap;