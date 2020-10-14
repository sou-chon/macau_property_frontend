import React, { FunctionComponent as FC }from 'react';
import style from './imageDisplay.module.css';
import { RouteComponentProps } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
//import { states } from '../../data/geoJSONData';

export const ImageDisplay: FC<RouteComponentProps<{ placeID: string, faceID: string }>> = ({ match: { params: { placeID, faceID }}}) => {
    console.log(placeID);
    return (
        <>
            <div className={style.white_out}>
                g
            </div>
            <div className={style.image_display}>
                <div className={style.face_image}>
                    <img src={`/faceIndex/${placeID}.png`}/>
                </div>
                <div className={style.place_info}>
                    MM001
                    info name
                </div>
                <div className={style.face_selection}>
                    <NavLink to={`/${placeID}/1`}><button>F1</button></NavLink>
                    <NavLink to={`/${placeID}/2`}><button>F2</button></NavLink>
                    <NavLink to={`/${placeID}/3`}><button>F3</button></NavLink>
                    <NavLink to='/'><button className={style.close_button}>Close</button></NavLink>
                </div>
                <div className={style.images}>
                    dsfa
                </div>
            </div>
        </>
    );
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
