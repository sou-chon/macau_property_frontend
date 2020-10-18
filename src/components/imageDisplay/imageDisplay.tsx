import React, { FunctionComponent as FC }from 'react';
import style from './imageDisplay.module.css';
import { RouteComponentProps } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
//import { states } from '../../data/geoJSONData';

export const ImageDisplay: FC<RouteComponentProps<{ placeID: string, faceID: string }>> = ({ match: { params: { placeID, faceID }}}) => {
    const data = window.data_hash[placeID];
    if (!data) {
        return (
            <>
                <div className={style.white_out} onClick={() => window._history.push('/')}>
                </div>
                <div className={style.image_display}>
                    Cannot find this place: {placeID}
                </div>
            </>
        );
    }

    const { id, name, images, numFaces } =  data.properties;

    return (
        <>
            <div className={style.white_out} onClick={() => window._history.push('/')}>
            </div>
            <div className={style.image_display}>
                <div className={style.face_image}>
                    <img src={`/faceIndex/${id}.png`}/>
                </div>
                <div className={style.place_info}>
                    <h5>{id}</h5>
                    <h5>{name}</h5>
                </div>
                <div className={style.face_selection}>
                    {
                        Array.from(new Array(numFaces), (_, i) => i).map(i => 
                            <NavLink key={i} to={`/${id}/${i+1}`} activeClassName={style.active_face_button}><button className={style.face_button}>F{i + 1}</button></NavLink>
                        )
                    }
                    <NavLink to='/' ><button className={style.close_button}>Close</button></NavLink>
                </div>
                <div className={style.images}>
                    {
                        images.filter(el => el.includes(`f${faceID}`)).map(el =>
                            <img src={`/photos/${placeID}/${el}`}/>
                        )
                    }
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
