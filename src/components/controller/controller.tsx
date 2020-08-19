class Controller {
    private map?: any;
    private readonly markers: { [uuid: string]: any };
    constructor() {
        this.markers = {};
    }

    initialiseWithMap(map: any) {
        this.map = map;
    }

    registerMarker(uuid: string, marker: any) {
        if (this.markers[uuid]) {
            throw new Error('Cannot add the same uuid.');
        }
        this.markers[uuid] = marker;
    }

    focusToMarker(uuid: string) {
        if (!this.markers[uuid]) {
            throw new Error(`Cannot find marker with uuid ${uuid}`);
        }
        const selectedMarker = this.markers[uuid];
        const markerPos = selectedMarker.getLatLng();
        this.map.panTo(markerPos);
        selectedMarker.openPopup();
    }

    listMarker() {
        return this.markers;
    }
}

export const controller = new Controller();
