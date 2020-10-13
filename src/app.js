import * as React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {GeolocateControl, Source, Layer,Marker} from 'react-map-gl';



const MAPBOX_TOKEN =
  'pk.eyJ1IjoiY2xhcmE5MnIiLCJhIjoiYjI4MjBhOTMzOWFlNWI5YTNmZjk0ODM4Y2NjYzk2MTYifQ.A2pArieN8zLVdKxHdQFAsg';
const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10
};

// const longitud = long()  {
//   if (navigator.geolocation) {
//     navigator.geolocation.watchPosition(function(position) {
      
//       return position.coords.longitude
//     });
//   }
// }




// const options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0
// };

// function success(pos) {
//   const crd = pos.coords;

//   console.log('Your current position is:');
//   console.log('Latitude : ' + crd.latitude);
//   console.log('Longitude: ' + crd.longitude);
//   console.log('More or less ' + crd.accuracy + ' meters.');
// };

// function error(err) {
//   console.warn('ERROR(' + err.code + '): ' + err.message);
// };

// navigator.geolocation.getCurrentPosition(success, error, options);


export default class App extends Component {
  state = {
    viewport: {
      latitude: 40.4165,
      longitude: -3.70256,
      zoom: 15,
      bearing: 0,
      pitch: 60
    },
    userPosition:{
      lat:navigator.geolocation.watchPosition(function(position) {
      console.log(position.coords.latitude)
        return position.coords.latitude
      }),
      long:navigator.geolocation.watchPosition(function(position) {
        console.log(position.coords.longitude)
        return position.coords.longitude
      }),
    }
    
    
  }

      



// componentDidMount() {
//   if (navigator.geolocation) {
//     navigator.geolocation.watchPosition(function(position) {
//       console.log("Latitude is :", position.coords.latitude);
//       console.log("Longitude is :", position.coords.longitude);
//     });
//   }
// }




  _onViewportChange = viewport => this.setState({viewport});

  render() { 
    const {viewport} = this.state;

   

  

    return (
      
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/clara92r/ckflmiayz1mr319ocab54m2hv"
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />

<Marker latitude={this.state.userPosition.lat} longitude={this.state.userPosition.long} offsetLeft={-20} offsetTop={-10}>
          <div>You are here</div>
        </Marker>

        <Source
          id="boisejson"
          type="geojson"
          data="https://json-server-heroku-1nq76kocv.vercel.app/db.geojson"
        />
        <Layer
          id="anything"
          type="symbol"
          source="boisejson"



          layout={{'icon-image': 'hospital-15'}}
        />
        
    {/* <div>{this.long}</div> */}
     
      </MapGL>
    );
  }
}

export function renderToDom(container) {
  render(<App />, container);
}
