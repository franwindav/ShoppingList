import React, { Component } from "react";
import { connect } from "react-redux";

let filters;

class Filters extends Component {
  render() {
    filters = Object.assign({}, this.props.filters);
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
            />{" "}
            -{" "}
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
            <App meta={"isDiscount"} data={["Товар со скидкой"]} />
          </ul>
        </li>
        <li className="New">
          <h3>Новые</h3>
          <ul>
            <App meta={"new"} data={["Недавно добавленные"]} />
          </ul>
        </li>
        <li className="urgency">
          <h3>Срочность</h3>
          <ul>
            <App meta={"urgency"} data={["Срочно"]} />
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
  changePrice() {
    if (filters["price"] === undefined) {
      filters["price"] = [];
    }
    let first = Number(this.priceInput1.value);
    let second =
      this.priceInput2.value.trim() !== ""
        ? Number(this.priceInput2.value)
        : Number.MAX_SAFE_INTEGER;

    filters["price"] = [];
    if (first === 0 || second < first) {
      this.priceInput1.value = "";
      filters["price"].push(0);
    } else {
      filters["price"].push(first);
    }
    if (first === 0 || second < first) {
      this.priceInput2.value = "";
      filters["price"].push(Number.MAX_SAFE_INTEGER);
    } else {
      filters["price"].push(second);
    }
  }
  changeFilters() {
    this.changePrice();
    this.props.onChangeFilters(filters);
  }
  uncheckAll() {
    let checkbox = document
      .querySelectorAll(`.app`)
      [this.props.index].querySelectorAll(`.filters .checkbox`);
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].checked = false;
    }
  }
  clearFilters() {
    this.priceInput1.value = "";
    this.priceInput2.value = "";
    this.uncheckAll();
    this.props.onClearFilters(filters);
  }
}

function App(props) {
  return props.data.map((e, i) => {
    i++;
    return (
      <li key={i}>
        <label>
          <input
            className="input"
            onClick={() => {
              if (filters[props.meta] === undefined) filters[props.meta] = [];
              let gap = filters[props.meta];
              gap.includes(i) ? gap.splice(gap.indexOf(i), 1) : gap.push(i);
              filters[props.meta] = gap;
            }}
            type="checkbox"
            className="checkbox"
          />
          <div className="check"> </div>
          <span>{e}</span>
        </label>
      </li>
    );
  });
}

export default connect(
  state => ({
    filters: state.filterProducts,
    products: state.products
  }),
  dispatch => ({
    onChangeFilters: filters => {
      dispatch({ type: "CHANGE_FILTERS", filters });
    },
    onClearFilters: () => {
      dispatch({ type: "CLEAR_FILTERS" });
    }
  })
)(Filters);
