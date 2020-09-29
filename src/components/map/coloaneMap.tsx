import React, { Component as C } from 'react';
import L from 'leaflet';

export class ColoaneMap extends C {
    componentDidMount() {
        const map = L.map('map_coloane', {
            maxBounds: [[
                25, 180
            ], [
                85, 398
            ]]
        }).setView([56, 199], 4);

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
