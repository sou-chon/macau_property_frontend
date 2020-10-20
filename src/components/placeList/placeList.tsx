import React, { FunctionComponent as FC, useEffect, useState } from 'react';
import { Place } from '../../models/place';
import { NavLink } from 'react-router-dom';
import style from './placeList.module.css';
import { MapNav } from '../MapNav/MapNav';
import { macauProperties } from '../../data/geoJSONData_macau';
import { switchToMap } from '../MapNav/MapNav';

export const maps_enum = {
    macau: '0',
    taipa: '1',
    coloane: '2' 
};

export const PlaceList: FC = () => {
    const [searchText, setSearchText] = useState('');
    const [filterIsland, setFilterIsland] = useState('');
    const [currentMap, setCurrentMap] = useState(maps_enum.macau);

    useEffect(() => {
        window.place_info_div = document.getElementById('place_info')!;
    }, [])

    return (
    <>
        <div id='map_navigation'>
            <div className={style.search_bar}>
                <input type='text' placeholder='Search name or ID' value={searchText} onChange={e => setSearchText(e.target.value)}/>
            </div>
        {
            searchText.length > 0
                ?
                [...window.geojson_macau.getLayers(), ...window.geojson_taipa.getLayers(), ...window.geojson_coloane.getLayers()]
                    .filter((el: any) => filterLayerBySearchString(el, searchText))
                    .map((el: any) => <OnePlaceDisplay key={el._leaflet_id} layer={el} setCurrentMap={setCurrentMap}/>)
                :
                <MapNav setCurrentMap={setCurrentMap} currentMap={currentMap}/>

        }
        </div>
        <div id='place_info'>
            Hover to show place info 
        </div>
    </>
    );
};

export const OnePlaceDisplay: FC<{ layer: any, setCurrentMap: any }> = ({ layer, setCurrentMap }) => {
    const internalLeafletId = layer._leaflet_id;
    const { properties, geometry, type } = layer.feature;
    const { name, id, island } = properties;

    return (
        //<NavLink to={`/${place.id}`}>
            <button className={style.one_place} onClick={() => {
                console.log(island);
                switch (island) {
                    case 'Macau':
                        switchToMap(maps_enum.macau);
                        setCurrentMap(maps_enum.macau);
                        window.map_macau.fitBounds(layer.getBounds().pad(1.5));
                        layer.openPopup();
                        break;
                    case 'Taipa':
                        switchToMap(maps_enum.taipa);
                        setCurrentMap(maps_enum.taipa);
                        window.map_taipa.fitBounds(layer.getBounds().pad(1.5));
                        layer.openPopup();
                        break;
                    case 'Coloane':
                        switchToMap(maps_enum.coloane);
                        setCurrentMap(maps_enum.coloane);
                        window.map_coloane.fitBounds(layer.getBounds().pad(1.5));
                        layer.openPopup();
                        break;

                }
            }}>
                <b>Name</b>: {name}<br/>
                <b>Id</b>: {id}
            </button>
        //</NavLink>
    );
};

function filterLayerBySearchString(layer: any, searchText: string): boolean {
    //const internalLeafletId = layer._leaflet_id;
    //const { properties, geometry, type } = layer.feature;
    const properties = layer.feature.properties;
    const { name, id } = properties;
    const searchTextLowercase = searchText.toLowerCase();
    if (name.toLowerCase().indexOf(searchTextLowercase) !== -1 || id.toLowerCase().indexOf(searchTextLowercase) !== -1) {
        return true;
    } else {
        return false;
    }

}
