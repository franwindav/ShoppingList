import React, { Component } from "react";
import List from "./List";

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
  }
  render() {
    console.log(this.state.lists);
    return [
      <div key="1" id="createNewList">
        <button onClick={this.createLists.bind(this)}>
          Создать новый лист покупок
        </button>
      </div>,
      <ul key="2">{this.state.lists}</ul>
    ];
  }
  addLists() {
    let lists = [];
    for (let i = 0; i < this.state.lists.length; i++) {
      lists.push(
        <li className="lists" key={i}>
          this.state.lists[i]
        </li>
      );
    }
    return lists;
  }
  createLists() {
    let newLists = this.state.lists;
    newLists.unshift(<List key={newLists.length}/>);
    this.setState({
      lists: newLists,
    });
  }
}

export default Lists;
