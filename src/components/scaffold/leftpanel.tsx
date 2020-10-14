import React, { FunctionComponent as FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { PlaceList } from '../placeList/placeList';
import style from './scaffold.module.css';

export const LeftPanel: FC = () => {
    return (
        <div className={style.left_panel}>
            {
                /*
            <div id='hover_info'>
                <span>Hover over buildings for info</span>
            </div>
                 */
            }
            <PlaceList/>
        </div>
    );
};
