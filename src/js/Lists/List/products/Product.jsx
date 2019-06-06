import React, { PureComponent } from "react";
import { connect } from 'react-redux';

class Product extends PureComponent {
  constructor(props) {
    super(props);
 
    this.state = {
      isRead: false
    };
  }
  render() {
    let data = this.props.info;
    return (
      <li className={this.state.isRead ?  'product read' : 'product'}>
        <div id="title">
          <a className="title" href="#">
            {data.title}
          </a>
        </div>
        <div className="container">
          <div id="prices">
            <div className="rating">
              <div className="stars">
                <ul className="main-stars">
                  <li>
                    <svg height="15px" viewBox="0 0 50 50" width="15px">
                      <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182" />
                    </svg>
                  </li>
                  <li>
                    <svg height="15px" viewBox="0 0 50 50" width="15px">
                      <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182" />
                    </svg>
                  </li>
                  <li>
                    <svg height="15px" viewBox="0 0 50 50" width="15px">
                      <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182" />
                    </svg>
                  </li>
                  <li>
                    <svg height="15px" viewBox="0 0 50 50" width="15px">
                      <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182" />
                    </svg>
                  </li>
                  <li>
                    <svg height="15px" viewBox="0 0 50 50" width="15px">
                      <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182" />
                    </svg>
                  </li>
                </ul>
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
                  <div className="percent">-{data.percentageDiscount}%</div>
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
            {data.urgency ? (<li className="urgency">Срочно</li>) : ""}
            {data.isDiscount ? <li className="stock">Акция</li> : ""}
            {data.new ? (<li className="new-product">Новинка</li>) : ""}
          </ul>
					<div className="about">
						Какой-то текст какой-то текст какой-то nекст какой-то
						Какой-то текст какой-то текст какой-то nекст какой-то
						Какой-то текст какой-то текст какой-то nекст какой-то
						Какой-то текст какой-то текст какой-то nекст какой-то
					</div>
        </div>
				<div className="remove-product" onClick={this.removeProduct.bind(this)}>
					<svg viewBox="0 0 50 50">
						<circle fill="#d75a4a" cx="25" cy="25" r="25"/>
						<polyline fill= "none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" points="16,34 25,25 34,16"/>
						<polyline fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10;" points="16,16 25,25 34,34"/>
					</svg>
				</div>
        <div className="read-product" onClick={this.readProduct.bind(this)}>
          <svg viewBox="0 0 60 60">
            <path d="M59.742,29.33C59.2,28.729,46.274,14.617,30,14.617c-16.273,0-29.2,14.112-29.742,14.713c-0.344,0.381-0.344,0.959,0,1.34
              C0.8,31.27,13.727,45.383,30,45.383c11.252,0,21.038-6.921,25.87-11.046c0.42-0.358,0.47-0.99,0.111-1.41
              c-0.36-0.421-0.991-0.468-1.41-0.111C49.949,36.762,40.61,43.383,30,43.383c-13.41,0-24.83-10.587-27.612-13.384
              C5.167,27.202,16.573,16.617,30,16.617c15.373,0,28.131,13.913,28.258,14.053c0.37,0.411,1.003,0.441,1.412,0.072
              C60.08,30.372,60.112,29.74,59.742,29.33z"/>
            <path d="M22.02,23.959c-0.473-0.291-1.087-0.14-1.375,0.33c-1.05,1.715-1.604,3.689-1.604,5.71c0,6.043,4.916,10.96,10.959,10.96
              s10.96-4.917,10.96-10.96S36.043,19.04,30,19.04c-1.83,0-3.643,0.461-5.24,1.332c-0.485,0.265-0.664,0.872-0.399,1.356
              c0.265,0.485,0.874,0.663,1.357,0.399c1.306-0.712,2.787-1.088,4.283-1.088c4.94,0,8.96,4.019,8.96,8.959s-4.02,8.96-8.96,8.96
              s-8.959-4.02-8.959-8.96c0-1.652,0.453-3.266,1.31-4.665C22.64,24.863,22.491,24.247,22.02,23.959z"/>
            <path d="M30,28.142c1.024,0,1.858,0.833,1.858,1.857c0,0.553,0.447,1,1,1s1-0.447,1-1c0-2.127-1.73-3.857-3.858-3.857
              c-2.127,0-3.857,1.73-3.857,3.857c0,2.128,1.73,3.858,3.857,3.858c0.553,0,1-0.447,1-1s-0.447-1-1-1
              c-1.024,0-1.857-0.834-1.857-1.858C28.143,28.975,28.976,28.142,30,28.142z"/>
          </svg>
        </div>
      </li>
    );
	}
	numberStars (){
    let {rating} = this.props.info;
		let w = 5 * rating;
		let stars = [];
		for (let i = 0; i < Math.floor(w); i++) {
			stars.push(
				<li key={i}>
					<svg height="15px" viewBox="0 0 50 50" width="15px">
						<polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 " />
					</svg>
				</li>
			);
		}
		stars.push(
			<li key={stars.length} style={{ width: 100 * (w - Math.floor(w)) + "%" }}>
				<svg height="15px" viewBox="0 0 50 50" width="15px">
					<polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 " />
				</svg>
			</li>
		);
		return stars;
  }
  removeProduct(){
    let {id} = this.props.info;
    confirm('Вы уверены, что хотите удалить товар?') ? this.props.dispatch({ type: 'REMOVE_PRODUCT', id }) : '';
  }
  readProduct(){
    this.setState({
      isRead: !this.state.isRead,
    })
    
  }
}

export default connect()(Product);
