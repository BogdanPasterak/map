import React, { Component } from 'react';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      bounds: {},
      info: {},
      vis: false
    }
  }

  componentDidMount() {
    this.setState({places: this.props.places})
    //console.log("componentDidMount")
    //console.log(this.state)
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
              //console.log(mapProps)
              //console.log(map)
              //console.log(this.state.bounds)
      //console.log(this.state.bounds.getCenter().lat() + "  " + this.state.bounds.getCenter().lng() + "  " + this.state.bounds);

    }

    const onReady = (mapProps, map ) => {

      //console.log('onReady')
      var gc = new mapProps.google.maps.Geocoder();
      var bounds = new mapProps.google.maps.LatLngBounds();
      var places = this.state.places;
      const self = this;

      places.map((place, index) => (
        gc.geocode(
          { address: place.place,
            componentRestrictions: {locality: "County Donegal Ireland"}
          }, function(result, status) {
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
              if (places.length - 1 === index){
                map.fitBounds(bounds)
                self.setState({bounds, places});
              }

            } else {
              console.log(status);
            }
          }
        )
      ));

    }

    const onMarkerClick = (props, marker, e) => {
      //console.log(props)
      //console.log(marker)
      //console.log(e)
      this.setState({info: marker, vis: true})
    }


    return (

    	<div className="map">
          <Map
            google={this.props.google}
            initialCenter={{ lat: 54.95, lng: -7.73 }}
            zoom={12}
            bounds={this.state.bounds}
            onReady={ onReady }
            onClick={mapClicked}
          >


            {(this.state)  && (
              console.log(this.state)
              //this.fb('Cos,2,3')

              //onChangeZoom={fb}
              //console.log(this.props)
              //<Listing places={this.state.places} />
            )}

            { this.state.places.length &&
              this.state.places[0].place_id &&
              this.state.places.map((place, index) => (
                //console.log(place.place_id)
                <Marker
                  key={index}
                  title={place.place}
                  position={place.location}
                  place_id={place.place_id}
                  onClick={onMarkerClick}
                />
            ))}
            { this.state.info && (
                //console.log(this.state.info.position),
              <InfoWindow
                marker={this.state.info}

                visible={this.state.vis}

                //onClose={this.onInfoWindowClose}
              >
                <div>
                <p>Dupa</p>
                </div>
              </InfoWindow>
            )}

          </Map>
      </div>

    );
  }
}



export default GoogleApiWrapper({
  apiKey: ('')
})(MapContainer)

// AIzaSyDx06paKbu3mHdx8irOe0kgVLxorL1up1M