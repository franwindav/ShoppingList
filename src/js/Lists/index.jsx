import React, { Component } from "react";
import { connect } from "react-redux";

import List from "./List";

class Lists extends Component {
  render() {
    return [
      <div key="div" id="createNewList">
        <input
          type="text"
          placeholder="Введите название списка"
          className="input"
          ref={input => {
            this.input = input;
          }}
        />
        <button onClick={this.createLists.bind(this)} className="button1">
          Создать новый лист покупок
        </button>
      </div>,
      <ul key="ul">{this.props.lists}</ul>
    ];
  }
  createLists() {
    if (this.input.value.trim() !== "") {
      let id = new Date().getTime();
      let newList = <List key={id} id={id} title={this.input.value} />;
      this.props.onAddList(newList);
    }
    this.input.value = "";
  }
}

export default connect(
  lists => ({
    lists: lists
  }),
  dispatch => ({
    onAddList: list => {
      dispatch({ type: "ADD_LIST", list });
    }
  })
)(Lists);
