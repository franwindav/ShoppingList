import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Lists from "./Lists";

function lists(state = [], action) {
  switch (action.type) {
    case "ADD_LIST": {
      let data = [action.list, ...state];
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

const store = createStore(
  lists,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Lists />
      </Provider>
    );
  }
}

export default App;
