import React, { Component } from "react";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import berlin from "./output";

const INITIAL_VIEW_STATE = {
  longitude: 13.424023540271659,
  latitude: 52.486449781253945,
  zoom: 10,
  minZoom: 2,
  maxZoom: 20
};

export const hexToRGBArray = hex =>
  hex.match(/\w\w/g).map(x => parseInt(x, 16));

export default class App extends Component {
  renderLayers() {
    return [
      new GeoJsonLayer({
        id: "geojson",
        data: berlin,
        opacity: 1,
        stroked: false,
        filled: false,
        lineWidthMinPixels: 0.5,
        parameters: {
          depthTest: false
        },
        getFillColor: [160, 160, 180, 200],
        getLineColor: ({ properties: { BOR: height } }) => {
          switch (height) {
            case 1:
              return hexToRGBArray("#d7144e");
            case 2:
              return hexToRGBArray("#e6fb2b");
            case 3:
              return hexToRGBArray("#3df727");
            default:
              return hexToRGBArray("#878cad");
          }
        },

        pickable: true,

        transitions: {
          getLineColor: 1000,
          getLineWidth: 1000
        }
      })
    ];
  }

  render() {
    const { mapStyle = "mapbox://styles/mapbox/dark-v9" } = this.props;

    return (
      <DeckGL
        layers={this.renderLayers()}
        pickingRadius={5}
        initialViewState={INITIAL_VIEW_STATE}
        controller
      >
        <StaticMap
          reuseMaps
          mapStyle={mapStyle}
          preventStyleDiffing
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        />

        {this._renderTooltip}
      </DeckGL>
    );
  }
}
