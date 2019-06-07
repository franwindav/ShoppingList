import React, { Component } from "react";
import { connect } from "react-redux";

let newProduct = {};

class AddProduct extends Component {
  render() {
    console.log(this.props);
    return (
      <ul id="add-products">
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
                type="text"
                className="input"
                ref={input => {
                  this.priceInput = input;
                }}
                placeholder="Цена"
              />
            </li>
            <li>
              <input
                type="text"
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
          <button className="add-product">Добавить</button>
          <button className="clear">Сбросить</button>
        </li>
      </ul>
    );
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
