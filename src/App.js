import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [
        { place: "Old Brookcourt, Letterkenny", title: "I live here" },
        { place: "Glenveagh National Park", title: "You must see" },
        { place: "Letterkenny Institute of Technology", title: "School" },
        { place: "Grianan of Aileach", title: "The Stone Fort" },
        { place: "Beltany Stone Circle", title: "Not just Stonehenge" },
        { place: "Hiring Fair Memorial, Letterkenny", title: "City ​​center" },
        { place: "Mount Errigal, Money More", title: "Wonderful view" }
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