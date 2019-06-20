import React, { Component } from "react";
import { connect } from "react-redux";

import Checkboxes from "Components/checkboxes";

class FiltersPurchases extends Component {
  constructor(props) {
    super(props);
    this.filters = {};
  }

  render() {
    this.filters = Object.assign({}, this.props.filterPurchases);
    return (
      <ul className="filters">
        <li className="price">
          <h3>Цена</h3>
          <div className="container">
            <input
              className="input"
              ref={input => {
                this.priceInput1 = input;
              }}
              placeholder={"От"}
              type="number"
            />
            {"  -  "}
            <input
              className="input"
              ref={input => {
                this.priceInput2 = input;
              }}
              placeholder={"До"}
              type="number"
            />
          </div>
        </li>
        <li className="stock">
          <h3>Акции</h3>
          <ul>
            <Checkboxes
              meta={"isDiscount"}
              data={["Товар со скидкой"]}
              onChangeCheckbox={this.onChangeCheckbox.bind(this)}
            />
          </ul>
        </li>
        <li className="New">
          <h3>Новые</h3>
          <ul>
            <Checkboxes
              meta={"new"}
              data={["Недавно добавленные"]}
              onChangeCheckbox={this.onChangeCheckbox.bind(this)}
            />
          </ul>
        </li>
        <li className="urgency">
          <h3>Срочность</h3>
          <ul>
            <Checkboxes
              meta={"urgency"}
              data={["Срочно"]}
              onChangeCheckbox={this.onChangeCheckbox.bind(this)}
            />
          </ul>
        </li>
        <li>
          <button
            className="change-filters button1"
            onClick={this.changeFilters.bind(this)}
          >
            Применить
          </button>
          <button
            className="clear-filters button2"
            onClick={this.clearFilters.bind(this)}
          >
            Сбросить
          </button>
        </li>
      </ul>
    );
  }

  // Изменение checkbox (для компонента Checkboxes)
  onChangeCheckbox(meta, i) {
    if (this.filters[meta] === undefined) this.filters[meta] = [];
    let gap = this.filters[meta];
    gap.includes(i) ? gap.splice(gap.indexOf(i), 1) : gap.push(i);
  }
  // Изменение цены
  changePrice() {
    if (this.filters["price"] === undefined) {
      this.filters["price"] = [];
    }
    let first = Number(this.priceInput1.value);
    let second =
      this.priceInput2.value.trim() !== ""
        ? Number(this.priceInput2.value)
        : Number.MAX_SAFE_INTEGER;

    this.filters["price"] = [];
    if (first === 0 || second < first) {
      this.priceInput1.value = "";
      this.filters["price"].push(0);
    } else {
      this.filters["price"].push(first);
    }
    if (first === 0 || second < first) {
      this.priceInput2.value = "";
      this.filters["price"].push(Number.MAX_SAFE_INTEGER);
    } else {
      this.filters["price"].push(second);
    }
  }
  // Изменение фильтров
  changeFilters() {
    this.changePrice();
    this.props.onChangeFilters(this.filters);
  }
  // uncheck all checkbox
  uncheckAllCheckboxes() {
    let checkbox = document
      .querySelectorAll(`.app`)
      [this.props.index].querySelectorAll(`.filters .checkbox`);
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].checked = false;
    }
  }
  // очистить фильтры
  clearFilters() {
    this.priceInput1.value = "";
    this.priceInput2.value = "";
    this.uncheckAllCheckboxes();
    this.props.onClearFilters(this.filters);
  }
}

export default connect(
  state => ({
    filterPurchases: state.filterPurchases
  }),
  dispatch => ({
    onChangeFilters: filters => {
      dispatch({ type: "CHANGE_FILTERS", filters });
    },
    onClearFilters: () => {
      dispatch({ type: "CLEAR_FILTERS" });
    }
  })
)(FiltersPurchases);
