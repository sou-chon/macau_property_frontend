import React, { Component as C } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export class MacauMap extends C {
    render() {
        return (
            <Map
                center={[74, 252]}
                zoom={4}
                onClick={
                    (e: any) => { console.log(e.latlng) }
                }
            >
                <TileLayer
                    url="/macau/{z}/{x}/{y}.png"
                    attribution="Leaflet"
                    maxZoom={6}
                    minZoom={4}
                    id='macau_map'
                    tileSize={256}
            />
            </Map>
        );
    }
}
