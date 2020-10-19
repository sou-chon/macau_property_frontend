import React, { Component as C } from 'react';
import L from 'leaflet';

export class TaipaMap extends C {
    componentDidMount() {
        const map = L.map('map_taipa', {
            maxBounds: [[
                0, 0.1875
            ], [
                -109.75, 154.6875
            ]],
            crs: L.CRS.Simple
        }).setView([-79.739, 104.48], 5);

        L.tileLayer('/taipa/{z}/{x}/{y}.png', {
            attribution: 'Leaflet',
            maxZoom: 6,
            minZoom: 4,
            id: 'taipa_map',
            tileSize: 256,
        }).addTo(map);

        window.map_taipa = map;
        window.map_taipa_container = document.getElementById('map_taipa')!;
        map.on('click', function(e: any) {
            console.log(`[${e.latlng.lng}, ${e.latlng.lat}],`);
        });
    }

    render() {
        return (
            <div id='map_taipa' className='map_base map_hidden'>
            </div>
        );
    }
}
