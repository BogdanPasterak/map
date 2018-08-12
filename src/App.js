import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [
        { position: {
           "lat" : 55.05716,
           "lng" : -7.938365
          },
          title: "Glenveagh National Park "
        },
        { position: {
         "lat" : 54.9507574,
         "lng" : -7.7238267
          },
          title: "Nr. 0"
        },
        { position: {
         "lat" : 55.134083,
         "lng" : -7.8417757
        }},
        { position: {
         "lat" : 54.9290853,
         "lng" : -7.8085484
        }},
        { position: {
         "lat" : 54.9495469,
         "lng" : -7.7378217
        }}
      ]

    }

  }


  render() {
    return (
      <div className="App">
        <div className="action">
        </div>
        <div className="map-div">
          <div className="title">
            <h1>My Neighborhood</h1>
          </div>


            <MapContainer />


        </div>
      </div>
    );
  }
}

export default App;


// AIzaSyDx06paKbu3mHdx8irOe0kgVLxorL1up1M