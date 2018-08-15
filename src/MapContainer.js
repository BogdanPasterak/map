import React, { Component } from 'react';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      bounds: {},
      infoMarker: {},
      infoVisible: false,
      infoTitle: 'Marker.title',
      autocomplete: {}
    }
  }

  componentDidMount() {
    this.setState({places: this.props.places});
    //console.log("componentDidMount")
    //console.log(this);
    this.setState({
      autocomplete: new this.props.google.maps.places.Autocomplete(
        document.getElementById('input-text'))
    })
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.places !== prevProps.places) {
      //console.log("componentDidUpdate")
      //console.log(this.state)
    }
  }

  render() {
            //console.log(this.props.google)

    const mapClicked = (mapProps, map, clickEvent) => {
      this.setState({infoVisible: false});
      console.log(map.zoom);
    }

    const onReady = (mapProps, map ) => {
      // I complete the places data with Geocoder
      var gc = new mapProps.google.maps.Geocoder();
      var bounds = new mapProps.google.maps.LatLngBounds();
      var places = this.state.places;
      const self = this;

      places.map((place, index) => (
        // I read data for every place
        gc.geocode(
          { address: place.place,
            componentRestrictions: {locality: "County Donegal Ireland"}
          }, function(result, status) {
            // and if OK
            if (status === "OK") {
              place.place_id = result[0].place_id;
              place.formatted_address = result[0].formatted_address;
              place.location = {
                lat: result[0].geometry.location.lat(),
                lng: result[0].geometry.location.lng()
              };
              place.address_components = result[0].address_components;
              place.types = result[0].types;
              bounds.extend(place.location);
              // If this last place, update the data and fit Map
              if (places.length - 1 === index){
                map.fitBounds(bounds)
                self.setState({bounds, places});
              }

            } else {
              console.log('I can not read the place data');
              console.log(place.place);
              console.log(status);
        }})
      ));
      console.log(map)

      var autocomplete = this.state.autocomplete;
      autocomplete.setBounds(map.getBounds());
      autocomplete.setComponentRestrictions({'country': 'IE'});


      this.setState({ autocomplete });
      console.log(autocomplete)


/*
        gc.geocode(
          { componentRestrictions: {locality: "County Donegal Ireland"}
          }, function(r,s) {
                console.log('tu')
                console.log(r[0].geometry.bounds)
                var don = new mapProps.google.maps.LatLngBounds(r[0].geometry.bounds)
                console.log(don)
                console.log('tu')

          }
        )
*/
    }

    const onMarkerClick = (props, marker, e) => {
      //console.log( this.state.infoMarker == marker);

      if (this.state.infoMarker !== marker)
      {
        this.setState({
          infoMarker: marker,
          infoVisible: true,
          infoTitle: marker.description
      });} else {
        this.setState({infoVisible: false});
      }
    }
    const onInfoOpen = () => {
      /*
      console.log(this.state.infoMarker.place_id);

      fetch('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJq2a91qqbX0gRrW_oBUf6Xy8&key=')
        .then(function(myJson) {
          console.log(myJson);
        })
        .catch(error => console.error(`Fetch Error =\n`, error));
      */

      //fetch('https://cors-anywhere.herokuapp.com/http://s0.geograph.org.uk/photos/05/15/051517_a46601a5.jpg')

      console.log('onOpen')



    }

    const windowHasClosed = (mapProps, map, clickEvent) => {
      console.log('windowHasClosed')
    }



    return (
      <div className="full-v">
        <div className="action">
          <input className="input-text" id="input-text" type="text" />
        </div>
        <div className="map-div">
          <div className="title">
            <h1>My Neighborhood</h1>
          </div>
        	<div className="map">
              <Map
                google={this.props.google}
                initialCenter={{ lat: 54.95, lng: -7.73 }}
                zoom={12}
                bounds={this.state.bounds}
                onReady={ onReady }
                onClick={ mapClicked }
              >
                { this.state.places.length &&
                  this.state.places[0].place_id &&
                  this.state.places.map((place, index) => (
                    // data for Markers are loaded in fun onReady
                    // I create them when the data is ready
                    <Marker
                      key={index}
                      title={place.title}
                      position={place.location}
                      description={place.place}
                      place_id={place.place_id}
                      onClick={onMarkerClick}
                    />
                ))}
                <InfoWindow
                  onOpen={onInfoOpen}
                  onClose={windowHasClosed}
                  marker={this.state.infoMarker}
                  visible={this.state.infoVisible}
                >
                  <div>
                    <h3>{this.state.infoTitle}</h3>
                    <div className="thumbnail">
                      <img className="thumbnail" src="http://s0.geograph.org.uk/photos/05/15/051517_a46601a5.jpg" />
                    </div>
                    <p>{this.state.infoMarker.place_id}</p>
                  </div>
                </InfoWindow>
              </Map>
          </div>
        </div>
      </div>
    );
  }
}



export default GoogleApiWrapper({
  apiKey: ('')
})(MapContainer)

// AIzaSyDx06paKbu3mHdx8irOe0kgVLxorL1up1M

//placeId: "ChIJq2a91qqbX0gRrW_oBUf6Xy8"