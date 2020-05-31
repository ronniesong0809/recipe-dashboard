import React, { Component } from 'react'
import Axios from 'axios'
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchText: this.props.searchText,
      data: []
    };
  }
  static defaultProps = {
    center: {
      lat: 45.5051,
      lng: -122.6750
    },
    zoom: 11
  };

  search(){
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const base = "https://api.yelp.com/v3/businesses/search?term="
    const params = "&location=portland&limit=3"
    const key = "Bearer 4mP1pGrwFpbuMXBoiIMkrGRA6WmtaU9boasPYOT-bvEZ0bi7xTl7lr6uXHORbbvWG4CsJwUY-bRLCvTRqyCYmKLKhWZ3Hsg7fWiKIAXM3BkETbtGtD7_8U-afM3uXXYx"
    const url = proxy + base + this.state.searchText + params
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
        this.setState({
          data: res.data.businesses
        })
      }
    })
    .catch(err => {
      console.log(err, "failed to search.");
    })
  }

  search2(){
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const base = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input="
    const params = "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry"
    const key = "&key=AIzaSyBM6S4xKcqav3e_UWqwNdvfGOwtYlK-XK0"
    const url = proxy + base + this.state.searchText + params + key
    Axios.get(url)
    .then((res) => {
      if(res.data) {
        console.log(res.data)
      }
    })
    .catch(err => {
      console.log(err, "failed to search.");
    })
  }

  componentDidMount(){
    this.search()
    // this.search2()
  }
  
  render() {
    
    return (
      <div style={{ height: '400px', width: '100%', marginBottom:'10px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:"AIzaSyBM6S4xKcqav3e_UWqwNdvfGOwtYlK-XK0"}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.state.data.map((item, item_key) => 
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