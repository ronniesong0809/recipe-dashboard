import React, { Component } from 'react'
import Axios from 'axios'

class Map extends Component {
  constructor() {
    super();
    this.state = { 
      searchText: "cake"
    };
  }

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
        console.log(res.data)
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
    const config = {
      headers: {
        "Access-Control-Allow-Origin":"http://localhost:3000",
        "accept": "application/json",
        "x-requested-with": "xmlhttprequest"
      }
    }

    // Axios.get(BASE_URL, config)
    // .then((res) => {
    //   if(res.data) {
    //     console.log(res.data)
    //   }
    // })
    // .catch(err => {
    //   console.log(err, "failed to search.");
    // })
    fetch(url, config)
    .then(res => res.json()).then((result) => {
      if(result.data) {
        console.log(result.data)
      }
    }).catch(error => {
      console.log(error, "failed to search.");
    })
  }

  componentDidMount(){
    this.search()
    this.search2()
  }

  render() {
    return (
      <div><hr/>Map</div>
    )
  }
}

export default Map