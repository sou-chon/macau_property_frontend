import L from 'leaflet';

interface IPlaceData {
    type: string;
    properties: IPlaceDataProperties;
    geometry: IPlaceDataGeometry;
}

interface IImage {
    imageFileName: string;
    thumbnailFileName: string;
    faceName: string;
    year: number;
}

interface IPlaceDataProperties {
    name: string;
    id: string;
    images: IImage[];
    address: string;
    island: string;
    category: string;
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
        geojson_taipa: any;
        geojson_coloane: any;
    };
}

