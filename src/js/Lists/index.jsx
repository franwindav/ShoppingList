import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import List from "List";

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
      <TransitionGroup component={"ul"} key="ul">
        {this.props.lists}
      </TransitionGroup>
    ];
  }
  createLists() {
    if (this.input.value.trim() !== "") {
      let id = new Date().getTime();
      let newList = (
        <CSSTransition timeout={1000} key={id} id={id} classNames="app">
          <List title={this.input.value} />
        </CSSTransition>
      );
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
