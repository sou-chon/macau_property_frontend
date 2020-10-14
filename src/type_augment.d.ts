import L from 'leaflet';

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
    }
}

