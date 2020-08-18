import React, { Component as C }from 'react';
import style from './map.module.css';

export class DraggableSVG extends C {
    componentDidMount() {
        const canv = document.createElement('canvas');
        canv.id = 'map_canva';
        const dragEl = document.getElementById('map_div')!;
        const domRect = dragEl.getBoundingClientRect();
        canv.setAttribute('width', `${domRect.width}`);
        canv.setAttribute('height', `${600}`);
        dragEl.appendChild(canv);
        const canvas = document.getElementById('map_canva')!;
        console.log(canvas);
        const ctx = (canvas as any).getContext('2d');
        const img = new Image();
        img.onload = () => {
            //ctx.scale(0.3, 0.3);
            ctx.drawImage(img, 0, 0);
        };
        img.src = '/coloane.svg';
        console.log(img);


        let lastPosition: { x: number, y: number } | undefined;
        dragEl.addEventListener('dragstart', ev => {
            lastPosition = { x: ev.clientX, y: ev.clientY };
            const nullImg = new Image();
            nullImg.src = '/null.png';
            ev.dataTransfer!.setDragImage(nullImg, 0, 0);
        });
        
        dragEl.addEventListener('drag', ev => {
            ev.preventDefault();
            const x = ev.clientX;
            const y = ev.clientY;
            if (x === 0 && y === 0) {
                return;
            }
            //const domRect = dragEl.getBoundingClientRect();
            const dx = x - lastPosition!.x;
            const dy = y - lastPosition!.y;
            if (Math.abs(dx) < 7 || Math.abs(dy) < 7) {
                return;
            }
            lastPosition = { x, y };
            ctx.translate(dx, dy);
            ctx.clearRect(0, 0, 10000, 10000);
            ctx.drawImage(img, 0, 0);
        });
    }

    render() {
        return (
            <div id='map_div' draggable>
            </div>
        );
    }
}
