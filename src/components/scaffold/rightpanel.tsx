import React, { FunctionComponent as FC } from 'react';
//import { Switch, Route } from 'react-router-dom';
import style from './scaffold.module.css';
import { Map } from '../map/map';

export const RightPanel: FC = () => {
    return (
        <div className={style.right_panel}>
            <Map/>
        </div>
    );
};
