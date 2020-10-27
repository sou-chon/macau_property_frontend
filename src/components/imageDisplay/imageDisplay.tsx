import React, { FunctionComponent as FC, useEffect }from 'react';
import style from './imageDisplay.module.css';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
//import { states } from '../../data/geoJSONData';


function escapeKeyEvent(e: any) {
        if (e.keyCode === 27) {
            window._history.push('/')
        }
}

export const ImageDisplay: FC<RouteComponentProps<{ placeID: string, faceID: string | undefined, year: string | undefined }>> = ({ match: { params: { year, placeID, faceID }}}) => {
    useEffect(() => {
        document.addEventListener('keydown', escapeKeyEvent);
        return () => {
            document.removeEventListener('keydown', escapeKeyEvent);
        };
    }, []);

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

    const { id, name, images, category, address } =  data.properties;

    const all_years = Array.from(new Set(images.map(el => el.year)));
    all_years.sort();
    if (all_years.length === 0) {
        return (
            <>
                <div className={style.white_out} onClick={() => window._history.push('/')}>
                </div>
                <div className={style.image_display}>
                    No image for this place yet.
                </div>
            </>
        );
    } else if (year === undefined) {
        return <Redirect to={`/${placeID}/${all_years[0]}`}/>;
    }

    let bigImageSrc: string | undefined = undefined;
    if (faceID) {
        const filtered = images.filter(el => el.faceName === faceID);
        if (filtered.length === 1) {
            bigImageSrc = filtered[0].imageFileName;
        }
    }

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
                    <br/>
                    <span>{address}</span><br/><br/>
                    <span>{category}</span>
                </div>
                <div className={style.face_selection}>
                    {
                        faceID ?
                        <NavLink to={`/${placeID}/${year}`}><button className={style.face_button}>Go back</button></NavLink>
                        :
                        all_years.map(el => 
                        <NavLink key={el} to={`/${placeID}/${el}`} activeClassName={style.active_face_button}><button className={style.face_button}>{el}</button></NavLink>
                    )
                    }
                    <NavLink to='/' ><button className={style.close_button}>Close</button></NavLink>
                </div>
                {
                    faceID ?
                    (
                        bigImageSrc ?
                        <div className={style.big_image}>
                            <img title='Open full photo in new tab' onClick={() => { window.open(`/photos/${placeID}/${bigImageSrc}.jpg`); } } src={`/photos/${placeID}/${bigImageSrc}.jpg`}/>
                        </div>
                        :
                        <div>Cannot find image.</div>
                    )
                    :
                    <div className={style.images}>
                        {
                            images.filter(el => el.year === parseInt(year)).map(el =>
                            <NavLink to={`/${placeID}/${year}/${el.faceName}`} key={el.faceName}>
                                <FaceImageThumbnail placeID={placeID} faceID={el.faceName} imageSrc={el.imageFileName}/>
                            </NavLink>
                            )
                        }
                    </div>
                }
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

const FaceImageThumbnail: FC<{ faceID: string, imageSrc: string, placeID: string }> = ({ faceID, imageSrc, placeID }) => {
            //<img onClick={() => { window.open(`/photos/${placeID}/${el}`); } } src={`/photos/${placeID}/${el}`}/>)
    return (
        <div className={style.thumbnail}>
            <div>
                <img src={`/photos/${placeID}/${imageSrc}_thumbnail.jpg`}/>
            </div>
            <div>
                {faceID}
            </div>
        </div>
    );
};


