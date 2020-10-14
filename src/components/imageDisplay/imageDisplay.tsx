import React, { FunctionComponent as FC }from 'react';
import style from './imageDisplay.module.css';
import { NavLink } from 'react-router-dom';
//import { states } from '../../data/geoJSONData';

export const ImageDisplay: FC<{ id: string }> = ({ id: selectedBuildingId }) => {
    //const selectedBuilding = states.filter(el => el.properties.id === selectedBuildingId);
    //if (selectedBuilding.length !== 1) {
    //    return (
    //        <div id='image_display' className={style.image_display}>
    //            <br/><br/>
    //            <h3>Oops! Not found</h3>
    //            <NavLink to='/'>
    //                <button className={style.close_button}>Close</button>
    //            </NavLink>
    //        </div>
    //    );
    //}
    //const { name, id, images: neededImages } = selectedBuilding[0].properties;
    return <div>HEY</div>;
    //return (
    //    <div id='image_display' className={style.image_display}>
    //        <br/><br/>
    //        <h3>{id} - {name}</h3>
    //        <NavLink to='/'>
    //            <button className={style.close_button}>Close</button>
    //        </NavLink>
    //        {
    //            neededImages.map((el: any) => <img key={el} src={`/photos/${el}`}/>)
    //        }
    //    </div>
    //);
}
