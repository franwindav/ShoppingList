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

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.store = createStore(
      reducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    this.index;
  }

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
          <Provider store={this.store}>
            <SortPurchases index={this.index} />
            <FiltersPurchases index={this.index} />
            <Purchases index={this.index} />
            <AddPurchase index={this.index} />
          </Provider>
        </div>
      </li>
    );
  }
  // Узнать индекс листа
  indexInitialization(e) {
    let { id } = e.props;
    e.props.shoppingLists.forEach((e, i) => {
      if (e.props.id === id) this.index = i;
    });
  }
  // Компонент появился
  componentDidMount() {
    this.animateAddList();
  }
  // Анимация добавления
  animateAddList() {
    $(`.app:eq(${this.index})`).slideDown({ duration: 400, queue: false });
    $(`.app:eq(${this.index})`).animate(
      { opacity: 1 },
      { duration: 600, queue: false }
    );
  }
  // Анимация при удалении
  animatedRemoveList() {
    let { dispatch, id } = this.props;
    $(`.app:eq(${this.index})`).animate(
      { opacity: 0 },
      { duration: 400, queue: false }
    );
    $(`.app:eq(${this.index})`).slideUp({
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
