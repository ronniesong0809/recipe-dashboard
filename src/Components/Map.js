import React, {Component} from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import './stylesheet.css'
import {Media} from 'react-bootstrap';
class MyMap extends Component {
  render() {
      return (
        <Map center={[45.5051, -122.6750]} zoom={13}>
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
                  height={64}
                  className="mr-3"
                  alt="171x180"
                  src={item.image_url}
                />
                <Media.Body>
                  <h5>{item.name}</h5>
                  {item.categories.map((category, c_key) =>
                    <span key={c_key}>{(c_key ? ' | ': '')}{category.title}</span>
                  )}
                  
                  <span>{item.rating} Stars from {item.review_count} <a href={item.url} rel="noopener noreferrer" target="_blank" className="card-title-source">reviews</a></span><br/>
                  <p>
                    Location: {item.location.display_address[0]} {item.location.display_address[1]} {item.location.display_address[2]}<br/>
                  </p>
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