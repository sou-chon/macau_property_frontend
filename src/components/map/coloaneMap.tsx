import React, { Component as C } from 'react';
import { coloaneProperties } from '../../data/geoJSONData_coloane';
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

        const geojson = L.geoJSON(coloaneProperties as any, {
            style: function(feature: any) {
                //switch (feature.properties.party) {
                switch (feature.properties.category) {
                    case '紀念物':
                        return ({ color: "#e60000" });
                    case '具建築藝術價值的樓宇':
                        return ({ color: "orange" });
                    case '建築群':
                        return ({ color: "#e6e600" });
                    case '場所':
                        return ({ color: "green" });
                }
                    //case 'Democrat':   return {color: "#0000ff"};
            } as any,
            onEachFeature
        }).addTo(map);
        window.geojson_coloane = geojson;
    }

    render() {
        return (
            <div id='map_coloane' className='map_base map_hidden'>
            </div>
        );
    }
}
