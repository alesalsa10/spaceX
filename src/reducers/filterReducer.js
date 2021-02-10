const INITIAL_STATE = {
    searchParameter: 'all'
};

const filterReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'FILTER':
            return {...state, searchParameter:action.payload}
        default:
            return state
    }
}

export default filterReducer;