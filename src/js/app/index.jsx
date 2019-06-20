import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import ShoppingLists from "./shoppingLists";
import reducer from "StoreWithShoppingLists";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ShoppingLists />
      </Provider>
    );
  }
}

export default App;
