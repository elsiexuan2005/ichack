// Map.js
import React from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 51.9,
  lng: -2.1
};

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: props.locations,
      directions: null,
      optimizeRoute: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.locations !== prevProps.locations) {
      this.setState({ markers: this.props.locations });
      this.calculateAndDisplayRoute();
    }
  }

  calculateAndDisplayRoute = () => {
    const { markers, optimizeRoute } = this.state;

    if (markers.length < 2) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
        {
          origin: new window.google.maps.LatLng(markers[0].lat, markers[0].lng),
          destination: new window.google.maps.LatLng(
            markers[markers.length - 1].lat,
            markers[markers.length - 1].lng
          ),
          waypoints: markers.slice(1, -1).map(loc => ({
            location: new window.google.maps.LatLng(loc.lat, loc.lng),
            stopover: true,
          })),
          optimizeWaypoints: optimizeRoute,
          travelMode: window.google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({ directions: result });
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    };
  

  toggleOptimization = () => {
    this.setState(prevState => ({
      optimizeRoute: !prevState.optimizeRoute
    }), this.calculateAndDisplayRoute);
  }

  render() {
    const { markers, directions } = this.state;

    return (
      <LoadScript googleMapsApiKey='AIzaSyAf7z9qAsU1_yzblAX8aNNJsQJsYtVkujs'>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {markers.map((marker, index) => (
            <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
          ))}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default Map;
