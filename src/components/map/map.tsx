import React, { FunctionComponent as FC }from 'react';
import style from './map.module.css';
import { DraggableSVG } from './draggableSVG';

export class Map extends React.Component {
    render() {
        return (
            <div className={style.map}>
                <DraggableSVG/>
                <div className={style.map_zoom_button}>
                    <button onClick={() => {
                        const canvas = document.getElementById('map_canva')!;
                        const ctx = (canvas as any).getContext('2d');
                        const img = new Image();
                        img.onload = () => {
                            ctx.clearRect(0, 0, 10000, 10000);
                            ctx.scale(1.25, 1.25);
                            ctx.drawImage(img, 0, 0);
                        };
                        img.src = '/coloane.svg';
                    }}>+</button>
                    <button onClick={() => {
                        const canvas = document.getElementById('map_canva')!;
                        const ctx = (canvas as any).getContext('2d');
                        const img = new Image();
                        img.onload = () => {
                            ctx.clearRect(0, 0, 10000, 10000);
                            ctx.scale(0.8, 0.8);
                            ctx.drawImage(img, 0, 0);
                        };
                        img.src = '/coloane.svg';
                    }}>-</button>
                </div>
            </div>
        );
    }
}

function incrementScale(originalString: string): string {
    // originalString will be like "scale(n) translated(-50%, -50%)"
    const originalFactorString = 
        originalString.substring(
            originalString.indexOf('scale(') + 6,
            originalString.indexOf(')')
        );
    const originalFactor = parseFloat(originalFactorString);
    return `scale(${originalFactor + 0.1}) translate(-50%, -50%)`;
}

function decrementScale(originalString: string): string {
    // originalString will be like "scale(n) translated(-50%, -50%)"
    const originalFactorString = 
        originalString.substring(
            originalString.indexOf('scale(') + 6,
            originalString.indexOf(')')
        );
    const originalFactor = parseFloat(originalFactorString);
    return `scale(${originalFactor - 0.1}) translate(-50%, -50%)`;
}
