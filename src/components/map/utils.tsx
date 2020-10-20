import L from 'leaflet';

export function highlightFeature(e: any) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    window.place_info_div.innerHTML = `${layer.feature.properties.id} - ${layer.feature.properties.name}`
}

function openImageDisplay(e: any) {
    const placeID = e.target.feature.properties.id;
    window._history.push(`/${placeID}/1`);
}

export function onEachFeature(map: any, geojson?: any) {
    return (feature: any, layer: any) => {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight(geojson),
            click: zoomToFeature(map),
            dblclick: openImageDisplay
        });
        const { properties: { name, id, faces } } = feature;
        //layer.bindPopup(L.popup({ minWidth: 200 }).setContent(`
        //    <div>
        //        <b>${name}</b>
        //        <br/>${id}<br/>
        //        <span class='more_photo_button' 
        //        onclick='(function display(){
        //            window._history.push("/${id}");
        //        })()'
        //        }">Show photos</span>
        //    </div>`)
        //);
        //window.face_arrows[id] = L.layerGroup(
        //    faces.map((el: any, ind: number) =>
        //        L.polygon(makeArrow(el.arrowCentre, 0.3, el.rotation) as any, {color: 'red', fillOpacity: 1}).bindTooltip(`F${ind}`, { opacity: 1, permanent: true, className: 'myCSSClass', offset: calculateTextOffset(el.rotation) as any})
        //));
    };
}

function resetHighlight(geojson: any) {
    return (e: any) => {
        geojson.resetStyle(e.target);
        window.place_info_div.innerHTML = 'Hover over to give info';
        //window.face_arrows[e.target.feature.properties.id].remove();
    };
}

function zoomToFeature(map: any) {
    return (e: any) => {
        console.log(e.target.feature.properties.id);
        map.fitBounds(e.target.getBounds().pad(1.5));
    };
}
