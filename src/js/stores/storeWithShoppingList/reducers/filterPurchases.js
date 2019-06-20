const initialState = {
  sortingID: 0
};

export default function filterProducts(state = initialState, action) {
  if (action.type === "CHANGE_FILTERS") {
    return Object.assign({}, action.filters);
  }
  if (action.type === "CHANGE_SORTING") {
    let data = Object.assign({}, state);
    data.sortingID = action.filterPurchases.sortingID;
    console.log(
      "TCL: filterProducts -> action.filterPurchases.sortingID",
      action.filterPurchases.sortingID
    );
    return data;
  } else if (action.type === "CLEAR_FILTERS") {
    return { sortingID: state.sortingID };
  }
  return state;
}
