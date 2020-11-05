import React, { Component as C } from 'react';
import L from 'leaflet';

import { taipaProperties } from '../../data/geoJSONData_taipa';
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

        /* adding geojson */
        function highlightFeature(e: any) {
            var layer = e.target;
            console.log(layer.feature.properties);

            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }

            if (window.place_info_div) {
                window.place_info_div.innerHTML = `${layer.feature.properties.id} - ${layer.feature.properties.name}`
            }
        }

        function openImageDisplay(e: any) {
            const placeID = e.target.feature.properties.id;
            window._history.push(`/${placeID}`);
        }

        function onEachFeature(feature: any, layer: any) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature,
                dblclick: openImageDisplay
            });
            const { properties: { name, id, faces } } = feature;
            layer.bindPopup(L.popup({ minWidth: 200 }).setContent(`
                <div>
                    <b>${name}</b>
                    <br/>${id}<br/>
                    <span class='more_photo_button' 
                    onclick='(function display(){
                        window._history.push("/${id}");
                    })()'
                    }">Show photos</span>
                </div>`)
            );
        }

        function resetHighlight(e: any) {
            geojson.resetStyle(e.target);
            if (window.place_info_div) {
                window.place_info_div.innerHTML = 'Hover over to give info';
            }
            //window.face_arrows[e.target.feature.properties.id].remove();
        }

        function zoomToFeature(e: any) {
            console.log(e.target.feature.properties.id);
            map.fitBounds(e.target.getBounds().pad(1.5));
        }

        const geojson = L.geoJSON(taipaProperties as any, {
            style: function(feature: any) {
                //switch (feature.properties.party) {
                switch (feature.properties.category) {
                    case '紀念物':
                        return ({ color: "#e60000" });
                    case '具建築藝術價值的樓宇':
                        return ({ color: "orange" });
                    case '建築群':
                        return ({ color: "#e6e600" });
                }
                    //case 'Democrat':   return {color: "#0000ff"};
            } as any,
            onEachFeature
        }).addTo(map);
        window.geojson_taipa = geojson;
    }

    render() {
        return (
            <div id='map_taipa' className='map_base map_hidden'>
            </div>
        );
    }
}
