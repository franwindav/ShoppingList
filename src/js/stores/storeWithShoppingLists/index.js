export default function shoppingLists(state = [], action) {
  switch (action.type) {
    case "ADD_LIST": {
      let data = [action.newShoppingList, ...state];
      return data;
    }
    case "REMOVE_LIST": {
      return state.filter(e => {
        return e.props.id !== action.id;
      });
    }
    default: {
      return state;
    }
  }
}
