import React, { Component } from "react";
import { connect } from "react-redux";

import ShoppingList from "ShoppingList";

class CreateNewShoppingList extends Component {
  render() {
    return (
      <div key="div" id="createNewList">
        <input
          type="text"
          placeholder="Введите название списка"
          className="input"
          ref={input => {
            this.titleOfNewShoppingList = input;
          }}
        />
        <button
          onClick={() => {
            this.createNewShoppingList();
            // Очистка поля
            this.titleOfNewShoppingList.value = "";
          }}
          className="button1"
        >
          Создать новый лист покупок
        </button>
      </div>
    );
  }
  // Создание нового листа
  createNewShoppingList() {
    if (this.titleOfNewShoppingList.value.trim() !== "") {
      const id = new Date().getTime();
      let newShoppingList = (
        <ShoppingList
          title={this.titleOfNewShoppingList.value}
          key={id}
          id={id}
        />
      );
      this.props.onAddNewShoppingList(newShoppingList);
    }
  }
}

export default connect(
  null,
  dispatch => ({
    onAddNewShoppingList: newShoppingList => {
      dispatch({ type: "ADD_LIST", newShoppingList });
    }
  })
)(CreateNewShoppingList);
