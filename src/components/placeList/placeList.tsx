import React, { FunctionComponent as FC, useEffect } from 'react';
import { Place } from '../../models/place';
import { NavLink } from 'react-router-dom';
import style from './placeList.module.css';
import { MapNav } from '../MapNav/MapNav';
import { macauProperties } from '../../data/geoJSONData_macau';

export const PlaceList: FC = () => {
    const [searchText, setSearchText] = React.useState('');
    const [filterIsland, setFilterIsland] = React.useState('');

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
                window.geojson_macau
                    .getLayers()
                    .filter((el: any) => filterLayerBySearchString(el, searchText))
                    .map((el: any) => <OnePlaceDisplay key={el._leaflet_id} layer={el}/>)
                :
                <MapNav/>

        }
        </div>
        <div id='place_info'>
            Hover to show place info 
        </div>
    </>
    );
};

export const OnePlaceDisplay: FC<{ layer: any }> = ({ layer }) => {
    const internalLeafletId = layer._leaflet_id;
    const { properties, geometry, type } = layer.feature;
    const { name, id } = properties;

    return (
        //<NavLink to={`/${place.id}`}>
            <button className={style.one_place} onClick={() => {
                window.map_macau.fitBounds(layer.getBounds().pad(1.5));
                layer.openPopup();
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
    if (name.indexOf(searchText) !== -1 || id.indexOf(searchText) !== -1) {
        return true;
    } else {
        return false;
    }

}
