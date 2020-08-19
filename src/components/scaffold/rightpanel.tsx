import React, { Component as C } from 'react';
//import { Switch, Route } from 'react-router-dom';
import style from './scaffold.module.css';
import { Map } from '../map/map';
import { controller } from '../controller/controller';

declare const L: any;

export class RightPanel extends C {
    componentDidMount() {
        const mymap = L.map('mapid', {
            crs: L.CRS.Simple,
            center: [500.505, 450],
        }).setView([51.505, -0.09], 13);
        const bounds = [[0,0], [700,900]];
        const image = L.imageOverlay('/maps/c10000.png', bounds).addTo(mymap);
        //mymap.fitBounds(bounds);
        mymap.setZoom(1);
        mymap.panTo([400, 500]);

        controller.initialiseWithMap(mymap);
        const marker = L.marker([500.5, 500]).addTo(mymap);
        marker.bindPopup("I am a circle.");
        controller.registerMarker('fakeplace1', marker);

        const marker2 = L.marker([300.5, 400]).addTo(mymap);
        marker2.bindPopup(`<b>FAKEPLACE2</b>
        <br/>Description<br/>
            Description<br/>
            Description<br/>PreviewPhotos<br/>PreviewPhotos</br>
        <a href='/s'>more_photo</a>
        <span class='more_photo_button' onclick='(function display(){
            document.getElementById("image_display").classList.add("image_display_show");
        })()'>More photos</span>`);
        controller.registerMarker('fakeplace2', marker2);
    }

    render() {
        return (
            <div className={style.right_panel}>
                <div id="mapid"></div>
            {/*<Map/>*/}
            </div>
        );
    }
};
