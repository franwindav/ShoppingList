const initialState = {};

export default function filterProducts(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_FILTERS": {
      return action.filters;
    }
    case "CLEAR_FILTERS": {
      return {};
    }
    default: {
      return state;
    }
  }
}
