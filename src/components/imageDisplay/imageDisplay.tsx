import React, { Component as C }from 'react';
import style from './imageDisplay.module.css';

export class ImageDisplay extends C {
    render() {
        return (
            <div id='image_display' className={style.image_display}>
                <br/><br/>
                <h3>Place name</h3>
                <button className={style.close_button} onClick={() => {
                    document.getElementById('image_display')?.classList.remove('image_display_show');
                }}>Close</button>
                <img src='/photos/1.png'/>
            </div>
        );
    }
}
