import React, { Component } from "react";
import Product from "./Product";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import $ from "jquery";

const height = 232;
const sortOrder = ["isDiscount", "urgency", "new"];

class Products extends Component {
  render() {
    let { data, filters } = this.props;
    let products =
      filters["price"] !== undefined
        ? data.filter(e => {
            return e["isDiscount"]
              ? e["priceDiscount"] >= filters["price"][0] &&
                  e["priceDiscount"] <= filters["price"][1]
              : e["price"] >= filters["price"][0] &&
                  e["price"] <= filters["price"][1];
          })
        : data.slice();
    for (let i = 0; i < sortOrder.length; i++) {
      if (filters[sortOrder[i]] !== undefined && filters[sortOrder[i]].length)
        products = products.filter(e => {
          for (let j = 0; j < filters[sortOrder[i]].length; j++) {
            if (filters[sortOrder[i]][j] == e[sortOrder[i]]) return true;
          }
          return false;
        });
    }
    return (
      <TransitionGroup component={"ul"} className="products" key="ul">
        {products.map((e, i) => (
          <CSSTransition timeout={1000} key={e.id} classNames="dragAndDrop">
            <li
              className="dragAndDrop"
              onMouseDown={this.dragAndDrop.bind(this, i)}
              key={e.id}
            >
              <Product info={e} />
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }
  dragAndDrop(i, e) {
    let { index } = this.props;
    let selector = `.app:eq(${index}) .dragAndDrop`;
    $(selector)
      .eq(i)
      .addClass("animate")
      .addClass("scale");
    $(selector).each(function() {
      $(this).css({ zIndex: 0 });
    });
    $(selector)
      .eq(i)
      .css("z-index", 100);
    $("body").css("overflow", "hidden");
    $(document.body).css("-webkit-user-select", "none");
    let list = [...this.props.data];
    let shiftY = e.pageY;
    let lastTop = 0;
    let lastScroll = 0;
    function moveAt(e) {
      $(selector)
        .eq(i)
        .css("z-index", 100);
      let newTop = lastTop + e.pageY - shiftY;
      if (e.pageY - shiftY > 0 && newTop >= height) {
        let value = list[i];
        list.splice(i, 1);
        list.splice(i + 1, 0, value);
        update(list);
        $(selector)
          .eq(i)
          .removeClass("animate")
          .removeClass("scale");
        i++;
        $(selector)
          .eq(i)
          .addClass("scale");
        $(selector).each(function() {
          $(this).css({ top: 0, zIndex: 0 });
        });
        lastTop = 0;
        shiftY = e.pageY;
        return;
      } else if (e.pageY - shiftY < 0 && -newTop >= height) {
        let value = list[i];
        list.splice(i, 1);
        list.splice(i - 1, 0, value);
        update(list);
        $(selector)
          .eq(i)
          .removeClass("animate")
          .removeClass("scale");
        i--;
        $(selector)
          .eq(i)
          .addClass("scale");
        $(selector).each(function() {
          $(this).css({ top: 0, zIndex: 0 });
        });
        lastTop = 0;
        shiftY = e.pageY;
        return;
      }
      if (i !== 0 && i !== list.length - 1) {
        if (newTop > 0) {
          $(selector)
            .eq(i + 1)
            .css("top", -newTop % height);
          $(selector)
            .eq(i - 1)
            .css("top", 0);
        } else {
          $(selector)
            .eq(i - 1)
            .css("top", -newTop % height);
          $(selector)
            .eq(i + 1)
            .css("top", 0);
        }
        $(selector)
          .eq(i)
          .css("top", newTop);
      }
      if (i === 0) {
        newTop = newTop <= 0 ? 0 : newTop;
        $(selector)
          .eq(i)
          .css("top", newTop);
        $(selector)
          .eq(i + 1)
          .css("top", -newTop % height);
      }
      if (i === list.length - 1) {
        newTop = newTop >= 0 ? 0 : newTop;
        $(selector)
          .eq(i)
          .css("top", newTop);
        $(selector)
          .eq(i - 1)
          .css("top", -newTop % height);
      }
      lastTop = newTop;
      shiftY = e.pageY;
    }
    document.onmousemove = function(e) {
      moveAt(e);
    };
    document.onmouseup = function(e) {
      $(selector)
        .eq(i)
        .addClass("animate");
      document.onmousemove = null;
      document.onmouseup = null;
      $("body").css("overflow", "auto");
      let time;
      let newTop = lastTop + e.pageY - shiftY;
      $(document.body).css("-webkit-user-select", "auto");
      if (newTop % height >= height / 2) {
        let value = list[i];
        list.splice(i, 1);
        list.splice(i + 1, 0, value);
        time = (height - (newTop % height)) * 2.5;
        $(selector)
          .eq(i)
          .animate({ top: Math.ceil(newTop / height) * height }, time);
        $(selector)
          .eq(i + 1)
          .animate({ top: -height }, time, function() {
            $(selector)
              .eq(i + 1)
              .removeClass("animate")
              .removeClass("scale");
            $(selector)
              .eq(i)
              .addClass("scale");
            reset(list, 0, i);
          });
        return;
      } else if (-newTop % height >= height / 2) {
        let value = list[i];
        list.splice(i, 1);
        list.splice(i - 1, 0, value);
        time = (height + (newTop % height)) * 2.5;
        $(selector)
          .eq(i)
          .animate({ top: Math.floor(newTop / height) * height }, time);
        $(selector)
          .eq(i - 1)
          .animate({ top: height }, time, function() {
            $(selector)
              .eq(i - 1)
              .removeClass("animate")
              .removeClass("scale");
            $(selector)
              .eq(i)
              .addClass("scale");
            reset(list, 0, i);
          });
        return;
      }
      time = (Math.abs(newTop) % height) * 3.5;
      reset(list, time, i);
    };
    let update = list => {
      this.props.onChangeFilters(list);
    };
    let reset = (list, time, i) => {
      $(selector).each(function() {
        $(this).animate({ top: 0 }, time);
      });
      $(selector)
        .eq(i)
        .addClass("animate")
        .removeClass("scale");
      update(list);
    };
  }
}

export default connect(
  state => ({
    data: state.products,
    filters: state.filterProducts
  }),
  dispatch => ({
    onChangeFilters: list => {
      dispatch({ type: "CHANGE_PRODUCT_POSITION", list });
    }
  })
)(Products);
