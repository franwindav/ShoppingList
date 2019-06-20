import React, { Component } from "react";
import { connect } from "react-redux";

import CreateNewShoppingList from "./createNewShoppingList";

class ShoppingLists extends Component {
  render() {
    return [
      <CreateNewShoppingList key={"CreateNewShoppingList"} />,
      <ul key="ul">{this.props.shoppingLists}</ul>
    ];
  }
}

export default connect(shoppingLists => ({
  shoppingLists: shoppingLists
}))(ShoppingLists);
