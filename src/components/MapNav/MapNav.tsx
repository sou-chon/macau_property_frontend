import React, { FunctionComponent as FC, useEffect, useState } from 'react';
import style from './mapNav.module.css';
import { maps_enum } from '../placeList/placeList';

export const MapNav: FC<{ setCurrentMap: any, currentMap: string }> = ({ currentMap, setCurrentMap }) => {
    return (
        <div>
            <div className={style.main_map_button_container}>
                <button
                    className={`${style.main_map_button}${currentMap === maps_enum.macau ? ` ${style.main_map_button_current}` : ''}`}
                    onClick={() => { switchToMap(maps_enum.macau); setCurrentMap(maps_enum.macau); }}
                >
                    Macau
                </button>
                <button
                    className={`${style.main_map_button}${currentMap === maps_enum.taipa ? ` ${style.main_map_button_current}` : ''}`}
                    onClick={() => { switchToMap(maps_enum.taipa); setCurrentMap(maps_enum.taipa); }}
                >
                    Taipa
                </button>
                <button
                    className={`${style.main_map_button}${currentMap === maps_enum.coloane ? ` ${style.main_map_button_current}` : ''}`}
                    onClick={() => { switchToMap(maps_enum.coloane); setCurrentMap(maps_enum.coloane); }}
                >
                    Coloane
                </button>
            </div>
            <div id='map_quick_nav' className={style.quick_nav_container}>
                <div className={style.quick_nav_index_button}>&#9666;Quick Nav</div>
                <div className={style.quick_nav_popup}>
                    <button
                        className={style.quick_nav_button}
                        onClick={() => {
                            switchToMap(maps_enum.macau);
                            window.map_macau.setView([-86.4349365234375, 33.84765625], 5);
                            setCurrentMap(maps_enum.macau);
                        }}
                    >
                        Macau Historic Centre
                    </button>
                    <button
                        className={style.quick_nav_button}
                        onClick={() => {
                            switchToMap(maps_enum.macau);
                            window.map_macau.setView([-61.8555908203125, 39.486572265625], 5);
                            setCurrentMap(maps_enum.macau);
                        }}
                    >
                        Freguesia de Santo António
                    </button>
                    <button
                        className={style.quick_nav_button}
                        onClick={() => {
                            switchToMap(maps_enum.macau);
                            window.map_macau.setView([-38.372314453125, 70.858154296875], 5);
                            setCurrentMap(maps_enum.macau);
                        }}
                    >
                        Colina de Mong Ha
                    </button>
                    <button
                        className={style.quick_nav_button}
                        onClick={() => {
                            switchToMap(maps_enum.macau);
                            window.map_macau.setView([-107.96875, 22.28125], 5);
                            setCurrentMap(maps_enum.macau);
                        }}
                    >
                        Sai Van
                    </button>
                    <button
                        className={style.quick_nav_button}
                        onClick={() => {
                            switchToMap(maps_enum.macau);
                            window.map_macau.setView([-66.5714111328125, 70.341796875], 5);
                            setCurrentMap(maps_enum.macau);
                        }}
                    >
                        Guia
                    </button>
                    <button
                        className={style.quick_nav_button}
                        onClick={() => {
                            switchToMap(maps_enum.taipa);
                            window.map_taipa.setView([-79.739, 104.48], 5);
                            setCurrentMap(maps_enum.taipa);
                        }}
                    >
                        Vila da Taipa
                    </button>
                    <button
                        className={style.quick_nav_button}
                        onClick={() => {
                            switchToMap(maps_enum.taipa);
                            window.map_taipa.setView([-30, 104.88], 5);
                            setCurrentMap(maps_enum.taipa);
                        }}
                    >
                        Universidade de Macau
                    </button>
                    <button
                        className={style.quick_nav_button}
                        onClick={() => {
                            switchToMap(maps_enum.taipa);
                            window.map_taipa.setView([-54.5, 38.2], 5);
                            setCurrentMap(maps_enum.taipa);
                        }}
                    >
                        Taipa Pequena
                    </button>
                    <button
                        className={style.quick_nav_button}
                        onClick={() => {
                            switchToMap(maps_enum.coloane);
                            window.map_coloane.setView([-78.1, 23.56], 5);
                            setCurrentMap(maps_enum.coloane);
                        }}
                    >
                        Vila de Coloane
                    </button>
                    <button
                        className={style.quick_nav_button}
                        onClick={() => {
                            switchToMap(maps_enum.coloane);
                            window.map_coloane.setView([-64, 66.45], 6);
                            setCurrentMap(maps_enum.coloane);
                        }}
                    >
                        Hac Sa
                    </button>
                    <button
                        className={style.quick_nav_button}
                        onClick={() => {
                            switchToMap(maps_enum.coloane);
                            window.map_coloane.setView([-28, 108.3], 6);
                            setCurrentMap(maps_enum.coloane);
                        }}
                    >
                        Povoação de Ka Ho
                    </button>
                </div>
            </div>
        </div>
    );
};

export function switchToMap(mapNum: string) {
    switch (mapNum) {
        case maps_enum.macau:
            window.map_macau_container.classList.remove('map_hidden');
            window.map_taipa_container.classList.add('map_hidden');
            window.map_coloane_container.classList.add('map_hidden');
            break;
        case maps_enum.taipa:
            window.map_macau_container.classList.add('map_hidden');
            window.map_taipa_container.classList.remove('map_hidden');
            window.map_coloane_container.classList.add('map_hidden');
            break;
        case maps_enum.coloane:
            window.map_macau_container.classList.add('map_hidden');
            window.map_taipa_container.classList.add('map_hidden');
            window.map_coloane_container.classList.remove('map_hidden');
            break;
        default:
            return;
    }
}
