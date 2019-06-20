import React, { Component } from "react";
import { connect } from "react-redux";

import Checkboxes from "Components/checkboxes";

class AddPurchase extends Component {
  constructor(props) {
    super(props);
    this.newPurchase = {};
  }

  render() {
    return (
      <ul className="add-products">
        <li className="information">
          <div className="title">
            <h3>Продукт</h3>
            <input
              className="input"
              type="text"
              ref={input => {
                this.titleInput = input;
              }}
              placeholder="Введите название продукта"
            />
            <textarea
              className="input"
              ref={input => {
                this.aboutInput = input;
              }}
              maxLength="377"
              placeholder="Введите описание продукта"
            />
          </div>
          <div>
            <ul>
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
              <li className="rating">
                <h3>Рейтинг</h3>
                <input
                  type="number"
                  className="input"
                  ref={input => {
                    this.ratingInput = input;
                  }}
                  step="0.01"
                  placeholder="Введите колличество звезд"
                />
                <input
                  type="number"
                  className="input"
                  ref={input => {
                    this.ratingCountInput = input;
                  }}
                  placeholder="Введите колличество отзывов"
                />
              </li>
            </ul>
          </div>
        </li>
        <li>
          <h3>Цена</h3>
          <ul className="price">
            <li>
              <input
                type="number"
                className="input"
                ref={input => {
                  this.priceInput = input;
                }}
                placeholder="Цена"
              />
            </li>
            <li>
              <input
                type="number"
                className="input"
                ref={input => {
                  this.priceDiscountInput = input;
                }}
                placeholder="Цена со скидкой"
              />
            </li>
          </ul>
        </li>
        <li>
          <button
            className="add-product button1"
            onClick={this.addPurchase.bind(this)}
          >
            Добавить
          </button>
          <button className="clear button2" onClick={this.clearAll.bind(this)}>
            Сбросить
          </button>
        </li>
      </ul>
    );
  }
  onChangeCheckbox(meta) {
    this.newPurchase[meta] = !this.newPurchase[meta];
  }
  // Очистить всё
  clearAll() {
    let checkbox = document
      .querySelectorAll(".app")
      [this.props.index].querySelectorAll(".add-products .checkbox");
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].checked = false;
    }
    this.titleInput.value = "";
    this.aboutInput.value = "";
    this.ratingInput.value = "";
    this.ratingCountInput.value = "";
    this.priceInput.value = "";
    this.priceDiscountInput.value = "";
    this.newPurchase = new Object();
  }
  // Добавить новую покупку и очищает поля
  addPurchase() {
    let { newPurchase } = this;
    let { filterPurchases } = this.props;
    newPurchase["title"] = this.titleInput.value;
    newPurchase["about"] = this.aboutInput.value;
    newPurchase["rating"] =
      Number(this.ratingInput.value) > 0
        ? Number(this.ratingInput.value) >= 5
          ? 1
          : Number(this.ratingInput.value) / 5
        : 0;
    newPurchase["price"] = Number(this.priceInput.value);
    newPurchase["isDiscount"] !== undefined && newPurchase["isDiscount"]
      ? (newPurchase["priceDiscount"] = Number(this.priceDiscountInput.value))
      : "";
    newPurchase["id"] = new Date().getTime();
    newPurchase["numberRatings"] =
      Number(this.ratingCountInput.value) > 0
        ? Number(this.ratingCountInput.value)
        : 0;
    newPurchase["isDiscount"] !== undefined &&
    newPurchase["isDiscount"] &&
    newPurchase["priceDiscount"] !== undefined
      ? (newPurchase["percentageDiscount"] =
          100 -
          Math.round(
            (newPurchase["priceDiscount"] / newPurchase["price"]) * 100
          ))
      : "";
    console.log("TCL: AddPurchase -> addPurchase -> newPurchase", newPurchase);
    this.props.dispatch({
      type: "ADD_PRODUCT",
      newPurchase,
      filterPurchases
    });
    this.clearAll();
  }
}

export default connect(state => ({
  filterPurchases: state.filterPurchases
}))(AddPurchase);
