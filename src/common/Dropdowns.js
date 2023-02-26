
export const seasons = [
    new Date().getFullYear()-1,
    new Date().getFullYear(),
    new Date().getFullYear()+1
]
export const filterNotEqualTo = (array, current) => {
    const filtered = array.filter(function (value, index, arr) {
        return value !== current;
    })
    return filtered
}
export const filterLessThan = (array, current) => {
    const filtered = array.filter(function (value, index, arr) {
        return value < current;
    })
    return filtered
}
export const filterGreaterThan = (array, current) => {
    const filtered = array.filter(function (value, index, arr) {
        return value > current;
    })
    return filtered
}



