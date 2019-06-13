import React, { Component } from "react";
import { connect } from "react-redux";

let newProduct;

class AddProduct extends Component {
  render() {
    newProduct = {};
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
            onClick={this.addProduct.bind(this)}
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
  }
  addProduct() {
    newProduct["title"] = this.titleInput.value;
    newProduct["about"] = this.aboutInput.value;
    newProduct["rating"] =
      Number(this.ratingInput.value) > 0
        ? Number(this.ratingInput.value) >= 5
          ? 1
          : Number(this.ratingInput.value) / 5
        : 0;
    newProduct["price"] = Number(this.priceInput.value);
    newProduct["isDiscount"] !== undefined && newProduct["isDiscount"]
      ? (newProduct["priceDiscount"] = Number(this.priceDiscountInput.value))
      : "";
    newProduct["id"] = new Date().getTime();
    newProduct["numberRatings"] =
      Number(this.ratingCountInput.value) > 0
        ? Number(this.ratingCountInput.value)
        : 0;
    newProduct["isDiscount"] !== undefined &&
    newProduct["isDiscount"] &&
    newProduct["priceDiscount"] !== undefined
      ? (newProduct["percentageDiscount"] =
          100 -
          Math.round((newProduct["priceDiscount"] / newProduct["price"]) * 100))
      : "";
    this.props.dispatch({ type: "ADD_PRODUCT", newProduct });
    this.clearAll();
  }
}

function App(props) {
  return props.data.map((e, i) => {
    i++;
    return (
      <li key={i}>
        <label>
          <input
            onClick={() => {
              newProduct[props.meta] = !newProduct[props.meta];
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

export default connect()(AddProduct);
