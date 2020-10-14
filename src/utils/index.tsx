export function makeArrow(centreCoordinate: number[], scale: number, rotateDeg: number | undefined): number[][] {
    if (centreCoordinate.length !== 2) {
        throw Error('Centre coordinates must be a 2-tuple.');
    }
    const baseArrowCoordinates = [[-0.4, -0.5], [0.4, -0.5], [0, 1]]; // [x, y]

    let arrow = baseArrowCoordinates;
    arrow = arrow.map(e => [e[0] * scale, e[1] * scale]);

    if (rotateDeg) {
        const rotationInRad = (-1) * rotateDeg / 180 * Math.PI; 
        const rotatedArrowCoordinates = arrow.map(e => {
            const x = e[0];
            const y = e[1];
            const rotatedX = x * Math.cos(rotationInRad) - y * Math.sin(rotationInRad);
            console.log(rotatedX, x);
            const rotatedY = x * Math.sin(rotationInRad) + y * Math.cos(rotationInRad);
            return [rotatedX, rotatedY];
        });
        arrow = rotatedArrowCoordinates;
    }
    arrow = arrow.map(e => [
        (e[1] + centreCoordinate[0]),
        (e[0] + centreCoordinate[1])
    ]);
    return arrow;
}

export function calculateTextOffset(rotateDeg: number): number[] {
    const distanceFromCentre = 30;
    const rotationInRad = (-1) * rotateDeg / 180 * Math.PI; 
    const x = distanceFromCentre * Math.sin(rotationInRad);
    const y = distanceFromCentre * Math.cos(rotationInRad);
    return [x, y];
}
