export enum Dimensions{
    C,
    CL,
    CLA
}

export const dimensionToSring = (d: Dimensions | undefined): string => {
    if (d === Dimensions.C) return 'C'
    if (d === Dimensions.CL) return 'CxL'
    if (d === Dimensions.CLA) return 'CxLxA'
    return ''
}

export default Dimensions;