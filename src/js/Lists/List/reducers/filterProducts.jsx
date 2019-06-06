const initialState = {};

export default function filterProducts(state = initialState, action) {
    if (action.type === 'CHANGE_FILTERS') {
        return action.filters;
    }else if (action.type === 'CLEAR_FILTERS'){
        return {};
    }
    return state;
}