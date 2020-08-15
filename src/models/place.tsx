export class Place {
    constructor(
        private readonly _id: string,
        private readonly _name: string,
        private readonly _location_name: string,
        private readonly _coordinate_x: number,
        private readonly _coordinate_y: number
    ) {}

    static fromObject(obj: IPlace): Place {
        if (
            obj.id === undefined || typeof obj.id !== 'string' ||
            obj.name === undefined || typeof obj.name !== 'string' ||
            obj.location_name === undefined || typeof obj.location_name !== 'string' ||
            obj.coordinate_x === undefined || typeof obj.coordinate_x !== 'number' ||
            obj.coordinate_y === undefined || typeof obj.coordinate_y !== 'number'
        ) {
            throw new Error('Wrong format of obj.');
        }
        const { id, name, location_name, coordinate_x, coordinate_y } = obj;
        return new Place(
            id,
            name,
            location_name,
            coordinate_x,
            coordinate_y
        );
    }

    static fromArray(array: IPlace[]): Place[] {
        return array.map(
            el => Place.fromObject(el)
        );
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get location_name() {
        return this._location_name;
    }

    get coordinate_x() {
        return this._coordinate_x;
    }

    get coordinate_y() {
        return this._coordinate_y;
    }
}

export interface IPlace {
    id: string,
    name: string,
    location_name: string,
    coordinate_x: number,
    coordinate_y: number
}
