import React, { Component as C } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export class TaipaMap extends C {
    render() {
        return (
            <Map
                center={[58, 305]}
                zoom={4}
                onClick={
                    (e: any) => { console.log(e.latlng) }
                }
            >
                <TileLayer
                    url="/taipa/{z}/{x}/{y}.png"
                    attribution="Leaflet"
                    maxZoom={6}
                    minZoom={4}
                    id='taipa_map'
                    tileSize={256}
            />
            </Map>
        );
    }
}
