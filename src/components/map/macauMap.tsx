import React, { Component as C } from 'react';
import L from 'leaflet';

export class MacauMap extends C {
    componentDidMount() {
        const map = L.map('map_macau', {
            maxBounds: [[
                85, 180
            ], [
                -27.7, 332 
            ]]
        }).setView([74, 252], 4);

        L.tileLayer('/macau/{z}/{x}/{y}.png', {
            attribution: 'Leaflet',
            maxZoom: 6,
            minZoom: 4,
            id: 'macau_map',
            tileSize: 256,
        }).addTo(map);

        window.map_macau = map;
        window.map_macau_container = document.getElementById('map_macau')!;
        map.on('click', function(e: any) {
            console.log(`[${e.latlng.lng}, ${e.latlng.lat}],`);
        });
    }

    render() {
        return (
            <div id='map_macau' className='map_base'>
            </div>
        );
    }
}
