import React, { Component } from 'react';
import './App.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      bounds: {},
      infoMarker: {position:{lat: 55.0575877,lng: -7.9376869}},
      infoVisible: false,
      infoTitle: 'Marker.title',
      autocomplete: {},
      thumbnail: true,
      setType: {},
      list: []
    }
  }

  componentDidMount() {
    this.setState({
      places: this.props.places,
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
    }

    const onReady = (mapProps, map ) => {
      // I complete the places data with Geocoder
      var gc = new mapProps.google.maps.Geocoder();
      var bounds = new mapProps.google.maps.LatLngBounds();
      var places = this.state.places;
      const self = this;
      var setT = new Set();
      var setType = [];
      var list = [];

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
                places.map(p => (
                  p.types.map( t => setT.add(t))
                ));
                setT.forEach(t => setType.push(t))
                places.map((pl) => (
                  list.push(pl.place)
                ));
                map.fitBounds(bounds)
                self.setState({bounds, places, setType, list});
              }

            } else {
              console.log('I can not read the place data');
              console.log(place.place);
              console.log(status);
        }})
      ));

      // Set bounds in autocomplete
      var autocomplete = this.state.autocomplete;
      autocomplete.setBounds(map.getBounds());
      autocomplete.setComponentRestrictions({'country': 'IE'});
      this.setState({ autocomplete });

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

    const changeTypes = () => {
      var autocomplete = this.state.autocomplete;
      var type = document.getElementById('selectType').value;
      var types = [];

      if (type !== "all" )
        types.push(type);

      autocomplete.setTypes(types);
      this.setState({ autocomplete });
    }

    const listTypes = () => {
      var type = document.getElementById('typePlace').value;
      var list = [];

      if (type === "" ) {
        this.state.places.map((pl) => (
          list.push(pl.place)
        ));
      } else {
        this.state.places.map((pl) => (
          (pl.types.includes(type)) ? list.push(pl.place) : ""
        ));
      }
      this.setState({list});
    }

    const capitalize = (str) => {
      str = str.replace(/_/g, " ");
      str = str.replace(/\b\w/g, l => l.toUpperCase());
      return str;
    }

    return (
      <div className="full-v">
        <div className="action">
          <div className="title-2">
            <h2>Searching for a places</h2>
          </div>
          <div className="line">
            <h5>Looking for</h5>
            <select id="selectType" onChange={changeTypes} aria-label="type place">
              <option value="all">Anything</option>
              <option value="geocode">Place</option>
              <option value="address">Address</option>
              <option value="establishment">Business</option>
            </select>
          </div>
          <input className="input-text" id="input-text" type="text" />
          <hr />
          <div className="line">
            <h5>Type</h5>
            <select id="typePlace" onChange={listTypes} aria-label="type place to show">
              <option value="" >All</option>
              { this.state.setType.length && this.state.setType.map((type) =>(
                <option key={type} value={type}>{capitalize(type)}</option>
              ))}
            </select>
          </div>
          <ul id="list" >
            { this.state.list.length && this.state.list.map(l => (
              <li key={l} >{l}</li>
            ))}
          </ul>
        </div>
        <div className="map-div">
          <div className="title">
            <h1>My Neighborhood</h1>
          </div>
        	<div className="map" role="application">
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
                  //position={{ lat: 54.95, lng: -7.73 }}
                  marker={this.state.infoMarker}
                  visible={this.state.infoVisible}
                >
                  <div>
                    <h3>{this.state.infoTitle}</h3>
                    { this.state.thumbnail && (
                      <div className="thumbnail">
                        <img className="thumbnail"
                          alt={this.state.infoMarker.title}
                          src={'img/'+this.state.infoTitle+'.jpg'}
                        />
                      </div>
                    )}
                    <a
                      href={
                        "https://www.google.com.sa/maps/@" +
                          this.state.infoMarker.position.lat + "," +
                          this.state.infoMarker.position.lng + ",14z"
                        }
                        target="_blank"
                      >
                      See this place in Google Maps
                    </a>
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
  apiKey: ('API_KEY')
})(MapContainer)

//
//
//placeId: "ChIJq2a91qqbX0gRrW_oBUf6Xy8"
