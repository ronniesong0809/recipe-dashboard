import React, { Component } from "react"
import Axios from "axios"

class Map extends Component {
  constructor() {
    super();
    this.state = { 
      searchText: "cake"
    };
  }

  search(){
    const BASE_URL = "https://api.yelp.com/v3/businesses/search?term=" + this.state.searchText + "&location=portland&limit=3"
    const config = { 
      headers: {
        "accept": "application/json",
        "x-requested-with": "xmlhttprequest",
        "Access-Control-Allow-Origin":"*",
        Authorization: "Bearer 4mP1pGrwFpbuMXBoiIMkrGRA6WmtaU9boasPYOT-bvEZ0bi7xTl7lr6uXHORbbvWG4CsJwUY-bRLCvTRqyCYmKLKhWZ3Hsg7fWiKIAXM3BkETbtGtD7_8U-afM3uXXYx"
      }
    }

    Axios.get(BASE_URL, config)
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
    const BASE_URL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input="+ this.state.searchText + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBM6S4xKcqav3e_UWqwNdvfGOwtYlK-XK0"
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
    fetch(BASE_URL, config)
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