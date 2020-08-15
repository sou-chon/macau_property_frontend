import React, { FunctionComponent as FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { PlaceList } from '../placeList/placeList';
import style from './scaffold.module.css';
import { placeData as hardCodedPlaces } from '../../data/placeData';
import { Place } from '../../models/place';

export const LeftPanel: FC = () => {
    return (
        <div className={style.left_panel}>
            <Switch>
                <Route path='/' render={() => <PlaceList places={Place.fromArray(hardCodedPlaces)}/>}/>
            </Switch>
        </div>
    );
};
