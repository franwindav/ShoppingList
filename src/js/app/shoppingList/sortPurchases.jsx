import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";

import Radios from "Components/radios";

const sortingData = ["По возрастанию цены", "По убыванию цены", "По рейтингу"];

class SortPurchases extends Component {
  render() {
    return (
      <div className="sortPurchases">
        <div
          className="sortText"
          onClick={() => {
            this.sortingAnimation();
          }}
        >
          {"Сортировать: "}
          <span
            ref={span => {
              this.textSpan = span;
            }}
          >
            {sortingData[this.props.filterPurchases.sortingID]}
          </span>
        </div>
        <ul
          className="sortingPanel"
          ref={ul => {
            this.sortingPanel = ul;
          }}
        >
          <Radios
            sortingData={sortingData}
            sortingAnimation={this.sortingAnimation.bind(this)}
          />
        </ul>
      </div>
    );
  }
  sortingAnimation() {
    $(this.textSpan).toggleClass("active");
    $(this.sortingPanel).toggleClass("active");
  }
}

export default connect(state => ({
  filterPurchases: state.filterPurchases
}))(SortPurchases);
