import * as React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {GeolocateControl, Source, Layer} from 'react-map-gl';
// import './app.css';


const MAPBOX_TOKEN =
  'pk.eyJ1IjoiY2xhcmE5MnIiLCJhIjoiYjI4MjBhOTMzOWFlNWI5YTNmZjk0ODM4Y2NjYzk2MTYifQ.A2pArieN8zLVdKxHdQFAsg';
const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10
};

export default class App extends Component {
  state = {
    viewport: {
      latitude: 40.4165,
      longitude: -3.70256,
      zoom: 15,
      bearing: 0,
      pitch: 60
    },
    // userLocation:{
    //   longitude: null,
    //   latitude: null,
    // },
    
  }

  componentDidMount() {
setInterval(() => {
   navigator.geolocation.getCurrentPosition (
      (position) => { console.log(position.coords.longitude,position.coords.latitude) },
      (error)    => { console.log(error) },
      {
        enableHighAccuracy: true,
        timeout:            1200,
        maximumAge:         15000
      }
    )
}, 1000);
   
  }
  
  


  _onViewportChange = viewport => this.setState({viewport});

  render() { 
    const {viewport} = this.state;

    let position = setInterval(() => {
      navigator.geolocation.getCurrentPosition (
      (position) => {position.coords.longitude},
         (error)    => { console.log(error) },
         {
           enableHighAccuracy: true,
           timeout:            1200,
           maximumAge:         15000
         }
       )
   }, 1000);



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
        
    <div className="coords">{position}</div>
     
      </MapGL>
    );
  }
}

export function renderToDom(container) {
  render(<App />, container);
}
