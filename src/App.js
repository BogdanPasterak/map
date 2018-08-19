import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {places: []}
  }

  componentDidMount() {
    const self = this;
    fetch("src/Places.js")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.setState({places: data.places})
      })
      .catch(function(error) {
        console.log('I can not read the places data');
        console.log(error);
        self.setState({places: [{place: "Old Brookcourt, Letterkenny", title: "Here" }]})
      });

  }


  render() {
    return (
      <div className="App">


            <MapContainer
              places = {this.state.places}
            />


      </div>
    );
  }
}

export default App;


//
