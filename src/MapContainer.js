import React, { Component } from 'react';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
            console.log(this.props.google)
    return (

    	<div className="map">
          <Map
            google={this.props.google}
            zoom={10}
            initialCenter={{ lat: 54.95, lng: -7.73 }}
          >

            <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

            <InfoWindow onClose={this.onInfoWindowClose}>
                <div>

                </div>
            </InfoWindow>
          </Map>
      </div>

    );
  }
}



export default GoogleApiWrapper({
  apiKey: ('')
})(MapContainer)

// AIzaSyDx06paKbu3mHdx8irOe0kgVLxorL1up1M