export const filter = (searchParameter) => {
    return {
        type: 'FILTER',
        payload: searchParameter
    }
}