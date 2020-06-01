import React, { Component } from 'react'
// import Axios from 'axios'
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 45.5051,
      lng: -122.6750
    },
    zoom: 11
  };

  render() {
    return (
      <div style={{ height: '400px', width: '100%', marginBottom:'10px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:"AIzaSyBM6S4xKcqav3e_UWqwNdvfGOwtYlK-XK0"}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.props.businesses.map((item, item_key) => 
            <AnyReactComponent key={item_key}
              lat={item.coordinates.latitude}
              lng={item.coordinates.longitude}
              text={item.name}
            />
          )}
        </GoogleMapReact>
      </div>
    )
  }
}

export default Map