import React, { Component as C } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export class ColoaneMap extends C {
    render() {
        return (
            <Map
                center={[56, 199]}
                zoom={6}
                onClick={
                    (e: any) => { console.log(e.latlng) }
                }
                maxBounds={[[
                    25, 180
                ], [
                    85, 398
                ]]}
            >
                <TileLayer
                    url="/coloane/{z}/{x}/{y}.png"
                    attribution="Leaflet"
                    maxZoom={6}
                    minZoom={4}
                    id='coloane_map'
                    tileSize={256}
            />
            </Map>
        );
    }
}
