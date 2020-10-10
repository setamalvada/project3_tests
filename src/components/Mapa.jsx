import * as React from 'react';
import {Component} from 'react';
import MapGL, {GeolocateControl, Source, Layer} from 'react-map-gl';
// import useGeolocation from 'react-hook-geolocation'

// import {PointLayer} from 'react-mapbox-gl-performance-layers';
// import points from '/points_project3.geojson';
// import {json as requestJson} from 'd3-request';
// import data from './points_project3.geojson';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiY2xhcmE5MnIiLCJhIjoiYjI4MjBhOTMzOWFlNWI5YTNmZjk0ODM4Y2NjYzk2MTYifQ.A2pArieN8zLVdKxHdQFAsg';
const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  margin: 10
};

class Mapa extends Component {
  state = {
    viewport: {
      latitude: 40.4165,
      longitude: -3.70256,
      zoom: 15,
      bearing: 0,
      pitch: 60
    }
  };

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
      </MapGL>
    );
  }
}

export default Mapa;
