import L from 'leaflet';

interface IPlaceData {
    type: string;
    properties: IPlaceDataProperties;
    geometry: IPlaceDataGeometry;
}

interface IPlaceDataProperties {
    name: string;
    id: string;
    images: string[];
    numFaces: number;
}

interface IPlaceDataGeometry {
    type: string;
    coordinates: number[][][];
}

declare global {
    interface Window {
        _history: any;
        map_macau: L.Map;
        map_macau_container: HTMLElement;
        map_taipa: L.Map;
        map_taipa_container: HTMLElement;
        map_coloane: L.Map;
        map_coloane_container: HTMLElement;
        place_info_div: HTMLElement;
        face_arrows: any;
        data_hash: { [id: string]: IPlaceData };
        geojson_macau: any;
    };
}

