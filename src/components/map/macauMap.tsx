import React, { Component as C } from 'react';
import L from 'leaflet';
import { macauProperties } from '../../data/geoJSONData_macau';
//import { makeArrow, calculateTextOffset } from '../../utils/index';

export class MacauMap extends C {
    componentDidMount() {
        const map = L.map('map_macau', {
            maxBounds: [[
                -148.574462890625, 107.936767578125
            ], [
                -0.63134765625, 0.030517578125
            ]],
            crs: L.CRS.Simple

        }).setView([-80, 48], 4);

        L.tileLayer('/macau/{z}/{x}/{y}.png', {
            attribution: 'Leaflet',
            maxZoom: 6,
            minZoom: 4,
            id: 'macau_map',
            tileSize: 256,
            tms: true,
        }).addTo(map);

        window.map_macau = map;
        window.map_macau_container = document.getElementById('map_macau')!;
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

        const geojson = L.geoJSON(macauProperties as any, {
            style: function(feature: any) {
                //switch (feature.properties.party) {
                return ({color: "#0033cc"});
                    //case 'Democrat':   return {color: "#0000ff"};
            },
            onEachFeature
        }).addTo(map);
        window.geojson_macau = geojson;
    }

    render() {
        return (
            <div id='map_macau' className='map_base'>
            </div>
        );
    }
}
