import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [
        { place: "Old Brookcourt, Letterkenny" },
        { place: "Glenveagh National Park"},
        { place: "Letterkenny Institute of Technology"},
        { place: "Grianan of Aileach"},
        { place: "Beltany Stone Circle" },
        { place: "Hiring Fair Memorial, Letterkenny" },
        { place: "Mount Errigal, Money More" }
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


            <MapContainer
              places = {this.state.places}
            />


        </div>
      </div>
    );
  }
}

export default App;


// AIzaSyDx06paKbu3mHdx8irOe0kgVLxorL1up1M