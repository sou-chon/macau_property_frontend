import React, { FunctionComponent as FC } from 'react';
import { Place } from '../../models/place';
import { NavLink } from 'react-router-dom';
import style from './placeList.module.css';
import { controller } from '../controller/controller';

export const PlaceList: FC = () => {
    const [searchText, setSearchText] = React.useState('');
    const [filterIsland, setFilterIsland] = React.useState('');

    return (
        <div>
            <div className={style.search_bar}>
                SEARCH BY NAME / ID: <input type='text' value={searchText} onChange={e => setSearchText(e.target.value)}/>
            </div>
        {
            searchText.length > 0
                ?
                (window as any).geojson
                    .getLayers()
                    .filter((el: any) => filterLayerBySearchString(el, searchText))
                    .map((el: any) => <OnePlaceDisplay key={el._leaflet_id} layer={el}/>)
                :
                null

        }
        </div>
    );
};

export const OnePlaceDisplay: FC<{ layer: any }> = ({ layer }) => {
    const internalLeafletId = layer._leaflet_id;
    const { properties, geometry, type } = layer.feature;
    const { name, id } = properties;

    return (
        //<NavLink to={`/${place.id}`}>
            <button className={style.one_place} onClick={() => {
                (window as any).mymap.fitBounds(layer.getBounds().pad(1.5));
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
