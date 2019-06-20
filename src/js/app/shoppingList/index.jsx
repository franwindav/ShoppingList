import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import $ from "jquery";
//
import SortPurchases from "./sortPurchases";
import FiltersPurchases from "./filtersPurchases";
import Purchases from "Purchases";
import reducers from "StoreWithShoppingList";
import AddPurchase from "./addPurchase";
import Cross from "SVG/cross";

let index;
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class ShoppingList extends Component {
  render() {
    this.indexInitialization(this);
    return (
      <li className="app">
        <div className="title-list">
          {this.props.title}
          <div
            className="remove-list remove"
            onClick={this.animatedRemoveList.bind(this)}
          >
            <Cross />
          </div>
        </div>
        <div className="list">
          <Provider store={store}>
            <SortPurchases index={index} />
            <FiltersPurchases index={index} />
            <Purchases index={index} />
            <AddPurchase index={index} />
          </Provider>
        </div>
      </li>
    );
  }
  // Узнать индекс листа
  indexInitialization(e) {
    let { id } = e.props;
    e.props.shoppingLists.forEach(function(e, i) {
      if (e.props.id === id) index = i;
    });
  }
  // Компонент появился
  componentDidMount() {
    this.animateAddList();
  }
  // Анимация добавления
  animateAddList() {
    $(`.app:eq(${index})`).slideDown({ duration: 400, queue: false });
    $(`.app:eq(${index})`).animate(
      { opacity: 1 },
      { duration: 600, queue: false }
    );
  }
  // Анимация при удалении
  animatedRemoveList() {
    let { dispatch, id } = this.props;
    $(`.app:eq(${index})`).animate(
      { opacity: 0 },
      { duration: 400, queue: false }
    );
    $(`.app:eq(${index})`).slideUp({
      duration: 600,
      queue: false,
      done: () => {
        dispatch({ type: "REMOVE_LIST", id });
      }
    });
  }
}

export default connect(shoppingLists => ({
  shoppingLists: shoppingLists
}))(ShoppingList);
