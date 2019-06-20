import React, { PureComponent } from "react";
import { connect } from "react-redux";

import Eye from "SVG/eye";
import Cross from "SVG/cross";
import Star from "SVG/star";

class Purchase extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isRead: false
    };
  }

  render() {
    const data = this.props.info;
    return (
      <div
        className={this.state.isRead ? "product read" : "product"}
        ref={li => {
          this.product = li;
        }}
      >
        <div className="title">
          <a className="title" href="#">
            {data.title}
          </a>
        </div>
        <div className="container">
          <div className="prices">
            <div className="rating">
              <div className="stars">
                <ul className="main-stars">{this.defaultStars()}</ul>
                <ul className="estimated-stars">{this.numberStars(data)}</ul>
              </div>
              <div className="count">{data.numberRatings}</div>
            </div>
            {data.isDiscount ? (
              [
                <div key={1} className="discount">
                  <p>
                    <s>{data.price}</s> &#8381;
                  </p>
                  <div className="percent">{data.percentageDiscount}%</div>
                </div>,
                <div key={2} className="price">
                  {data.priceDiscount}
                  <span style={{ color: "lightgray", fontWeight: "normal" }}>
                    &#8381;
                  </span>
                </div>
              ]
            ) : (
              <div className="price">
                {data.price}
                <span style={{ color: "lightgray", fontWeight: "normal" }}>
                  &#8381;
                </span>
              </div>
            )}
          </div>
          <ul className="special-offers">
            {data.urgency ? <li className="urgency">Срочно</li> : ""}
            {data.isDiscount ? <li className="stock">Акция</li> : ""}
            {data.new ? <li className="new-product">Новинка</li> : ""}
          </ul>
          <div className="about">{data.about}</div>
        </div>
        <div
          className="remove-product remove"
          onClick={this.removePurchase.bind(this)}
        >
          <Cross />
        </div>
        <div className="read-product" onClick={this.readPurchase.bind(this)}>
          <Eye />
        </div>
      </div>
    );
  }
  defaultStars() {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <li key={i}>
          <Star />
        </li>
      );
    }
    return stars;
  }
  numberStars() {
    let { rating } = this.props.info;
    let w = 5 * rating;
    let stars = [];
    for (let i = 0; i < Math.floor(w); i++) {
      stars.push(
        <li key={i}>
          <Star />
        </li>
      );
    }
    stars.push(
      <li key={stars.length} style={{ width: 100 * (w - Math.floor(w)) + "%" }}>
        <Star />
      </li>
    );
    return stars;
  }
  removePurchase() {
    let { id } = this.props.info;
    this.props.onRemovePurchase(id);
  }
  readPurchase() {
    this.setState({
      isRead: !this.state.isRead
    });
  }
}

export default connect(
  null,
  dispatch => ({
    onRemovePurchase: id => {
      dispatch({ type: "REMOVE_PRODUCT", id });
    }
  })
)(Purchase);
