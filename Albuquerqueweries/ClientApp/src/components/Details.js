import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class Details extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    };

    render() {

      let mapStyles = {
          width: '500px',
          height: '500px'
      };

      return (
          <div>
              <h1>{this.props.location.state.brewery.breweryName}</h1>
              {this.props.location.state.brewery.streetAddress}<br />
              {this.props.location.state.brewery.cityStateZip}<br /><br />
              <Map
                  google={this.props.google}
                  zoom={14}
                  style={mapStyles}
                  initialCenter={
                      {
                          lat: this.props.location.state.brewery.latitude,
                          lng: this.props.location.state.brewery.longitude
                      }
                  }
              >
                  <Marker
                      onClick={this.onMarkerClick}
                      name={this.props.location.state.brewery.breweryName}
                  />
              </Map>
          </div>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: process.env.MapsAPIKey
})(Details);
