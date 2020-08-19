import React, { FunctionComponent as FC } from 'react';
import { Place } from '../../models/place';
import { NavLink } from 'react-router-dom';
import style from './placeList.module.css';
import { controller } from '../controller/controller';

export const PlaceList: FC<{ places: Place[] }> = ({ places }) => {
    const [searchText, setSearchText] = React.useState('');
    const [filterIsland, setFilterIsland] = React.useState('');

    return (
        <div>
            <div className={style.search_bar}>
                SEARCH: <input type='text' value={searchText} onChange={e => setSearchText(e.target.value)}/>
            </div>
        {
            searchText.length > 0
                ?
                places
                    .filter(el => el.name.indexOf(searchText) !== -1 || el.location_name.indexOf(searchText) !== -1)
                    .map(el => <OnePlaceDisplay place={el}/>)
                :
                places
                    .map(el => <OnePlaceDisplay place={el}/>)

        }
        </div>
    );
};

export const OnePlaceDisplay: FC<{ place: Place }> = ({ place }) => {
    return (
        //<NavLink to={`/${place.id}`}>
            <button className={style.one_place} onClick={() => {
                controller.focusToMarker(place.name);
            }}>
                <b>Name</b>: {place.name}<br/>
                <b>Location</b>: {place.location_name}
            </button>
        //</NavLink>
    );
};
