import React, { Component as C } from 'react';
//import { Switch, Route } from 'react-router-dom';
import style from './scaffold.module.css';
import { controller } from '../controller/controller';
import { states } from '../../data/geoJSONData';
//import { NavLink } from 'react-router-dom';
//import { Map, Popup, ImageOverlay } from 'react-leaflet'

declare const L: any;

export class RightPanel extends C {
    componentDidMount() {
        const mymap = L.map('mapid', {
            crs: L.CRS.Simple,
            center: [500.505, 450],
        }).setView([51.505, -0.09], 13);

        (window as any).mymap = mymap;
        const bounds = [[0,0], [2400, 1000]];
        const image = L.imageOverlay('/maps/map_entire.png', bounds).addTo(mymap);
        mymap.fitBounds(bounds);
        mymap.setZoom(1);
        mymap.panTo([400, 500]);

        controller.initialiseWithMap(mymap);

        mymap.on('click', function(e: any) {
            console.log(`[${e.latlng.lng}, ${e.latlng.lat}],`);
        });

        //////////////////////////////////////////////////
        function onEachFeature(feature: any, layer: any) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            });
            const { properties: { name, id } } = feature;
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
        }

        function zoomToFeature(e: any) {
            mymap.fitBounds(e.target.getBounds().pad(1.5));
        }

        const geojson = L.geoJSON(states, {
            style: function(feature: any) {
                //switch (feature.properties.party) {
                return ({color: "#000000"});
                    //case 'Democrat':   return {color: "#0000ff"};
            },
            onEachFeature
        }).addTo(mymap);

        (window as any).geojson = geojson;
    }

    render() {
        return (
            <div className={style.right_panel}>
                <div id="mapid"></div>
            </div>
        );
    }
};

function highlightFeature(e: any) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

