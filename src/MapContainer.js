import React, { Component } from 'react';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      bounds: {},
      info:  false,
      infoMarker: {},
      infoVisible: false,
      infoTitle: 'arker.title'
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
      this.setState({infoVisible: false})
    }

    const onReady = (mapProps, map ) => {
      console.log(mapProps)
      // I complete the places data with Geocoder
      var gc = new mapProps.google.maps.Geocoder();
      var bounds = new mapProps.google.maps.LatLngBounds();
      var service = new mapProps.google.maps.places.PlacesService(map);
      var places = this.state.places;
      console.log(service)
      const self = this;


                service.getDetails({
                  placeId: "ChIJq2a91qqbX0gRrW_oBUf6Xy8"
                }), function (p, s) {
                    console.log(s);
                    console.log(p);
                }

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
                /*
                service.getDetails({
                  placeId: places[1].place_id
                }), function (p, s) {
                  if ( s === "OK") {
                    console.log("details");
                    console.log(p);
                  } else {
                    console.log('I can not read the details place');
                    console.log(places[1].place_id);
                    console.log(status);
                  }
                }
                */
                map.fitBounds(bounds)
                self.setState({bounds, places});
              }

            } else {
              console.log('I can not read the place data');
              console.log(place.place);
              console.log(status);
        }})
      ));
    }

    const onMarkerClick = (props, marker, e) => {
      //console.log(props)
      //console.log(marker)
      //console.log(e)
      this.setState({
        info: true,
        infoMarker: marker,
        infoVisible: true,
        infoTitle: marker.description
      })
    }
    const onInfoOpen = (mapProps, map, e) => {
      console.log('mapProps')
      console.log('onOpen')
    }
    const windowHasClosed = (mapProps, map, clickEvent) => {
      console.log('windowHasClosed')
    }



    return (

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
              <p>{this.state.infoTitle}</p>
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

//placeId: "ChIJq2a91qqbX0gRrW_oBUf6Xy8"