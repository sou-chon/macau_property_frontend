import React, { Component as C } from 'react';
import L from 'leaflet';

export class ColoaneMap extends C {
    componentDidMount() {
        const map = L.map('map_coloane', {
            maxBounds: [[
                -0.55, 0.9345
            ], [
                -108.55, 153.684
            ]],
            crs: L.CRS.Simple
        }).setView([-75.68, 23.91], 5);

        L.tileLayer('/coloane/{z}/{x}/{y}.png', {
            attribution: 'Leaflet',
            maxZoom: 6,
            minZoom: 4,
            id: 'coloane_map',
            tileSize: 256,
        }).addTo(map);

        window.map_coloane = map;
        window.map_coloane_container = document.getElementById('map_coloane')!;
        map.on('click', function(e: any) {
            console.log(`[${e.latlng.lng}, ${e.latlng.lat}],`);
        });
    }

    render() {
        return (
            <div id='map_coloane' className='map_base map_hidden'>
            </div>
        );
    }
}
