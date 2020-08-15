import React, { FunctionComponent as FC }from 'react';
import { COLOANE_SVG } from '../../static/coloane';
import style from './map.module.css';

export class Map extends React.Component {
    componentDidMount() {
        const pic = document.getElementById('coloane_svg')!;
        pic.addEventListener('drag', () => {

        });
    }

    render() {
        return (
            <div className={style.map}>
                <COLOANE_SVG/>
                <div className={style.map_zoom_button}>
                    <button onClick={() => {
                        const originalScale = document.getElementById('coloane_svg')!.style.transform;
                        document.getElementById('coloane_svg')!.style.transform = incrementScale(originalScale);
                    }}>+</button>
                    <button onClick={() => {
                        const originalScale = document.getElementById('coloane_svg')!.style.transform;
                        document.getElementById('coloane_svg')!.style.transform = decrementScale(originalScale);
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
