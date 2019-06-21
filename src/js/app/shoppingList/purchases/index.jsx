import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import $ from "jquery";

import Product from "./purchase";

const height = 232;

class Purchases extends Component {
  render() {
    let { data } = this.props;
    return (
      <TransitionGroup component={"ul"} className="products" key="ul">
        {data.map((e, i) => (
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
  //
  //
  //
  dragAndDrop(i, e) {
    const { index } = this.props;
    const selector = `.app:eq(${index}) .dragAndDrop`;
    // Увелечение выбранного объекта
    $(selector)
      .eq(i)
      .addClass("animate")
      .addClass("scale");
    // поднятие нужного элемента выше всех
    // через z-index
    $(selector).each(function() {
      $(this).css({ zIndex: 0 });
    });
    $(selector)
      .eq(i)
      .css("z-index", 100);
    // Запретить прокрутку
    $("body").css("overflow", "hidden");
    // Запретить выделение текста, изображений и т.д.
    $(document.body).css("-webkit-user-select", "none");
    // Создание основных перемен
    let list = [...this.props.data];
    let shiftY = e.pageY;
    let newTop = 0;
    let lastTop = 0;
    function moveAt(e) {
      newTop = lastTop + e.pageY - shiftY;
      if (e.pageY - shiftY > 0 && newTop >= height) {
        changePositions(e, 1);
        return;
      } else if (e.pageY - shiftY < 0 && -newTop >= height) {
        changePositions(e, -1);
        return;
      }
      if (i !== 0 && i !== list.length - 1) {
        newTop > 0 ? animateMoveProduct(1, -1) : animateMoveProduct(-1, 1);
      } else {
        i === 0 ? animateMoveProduct(1) : animateMoveProduct(-1);
      }
      $(selector)
        .eq(i)
        .css("top", newTop);
      lastTop = newTop;
      shiftY = e.pageY;
    }
    //
    //
    document.onmousemove = function(e) {
      moveAt(e);
    };
    //
    //
    document.onmouseup = function(e) {
      $(selector)
        .eq(i)
        .addClass("animate");
      document.onmousemove = null;
      document.onmouseup = null;
      // Разрешить прокрутку
      $("body").css("overflow", "auto");
      newTop = lastTop + e.pageY - shiftY;
      if (newTop % height >= height / 2) {
        animateMouseUpProduct(1);
        return;
      } else if (-newTop % height >= height / 2) {
        animateMouseUpProduct(-1);
        return;
      }
      let time = (Math.abs(newTop) % height) * 3.5;
      reset(list, time, i);
    };
    //
    //
    const changeList = k => {
      let value = list[i];
      list.splice(i, 1);
      list.splice(i + k, 0, value);
    };
    //
    //
    const animateMouseUpProduct = k => {
      changeList(k);
      let time = (height - k * (newTop % height)) * 2.5;
      k > 0
        ? $(selector)
            .eq(i)
            .animate({ top: Math.ceil(newTop / height) * height }, time)
        : $(selector)
            .eq(i)
            .animate({ top: Math.floor(newTop / height) * height }, time);

      $(selector)
        .eq(i + k)
        .animate({ top: -(height * k) }, time, function() {
          $(selector)
            .eq(i + k)
            .removeClass("animate")
            .removeClass("scale");
          $(selector)
            .eq(i)
            .addClass("scale");
          reset(list, 0, i);
        });
    };
    //
    //
    const animateMoveProduct = (k1, k2) => {
      if (k1 != undefined && k2 != undefined) {
        $(selector)
          .eq(i + k1)
          .css("top", -newTop % height);
        $(selector)
          .eq(i + k2)
          .css("top", 0);
      } else if (k1 != undefined && k2 == undefined) {
        newTop = newTop * k1 <= 0 ? 0 : newTop;
        if ($(selector).length == 1) newTop = 0;
        $(selector)
          .eq(i + k1)
          .css("top", -newTop % height);
      }
      return;
    };
    //
    //
    const changePositions = (e, k) => {
      changeList(k);
      update(list);
      $(selector)
        .eq(i)
        .removeClass("animate")
        .removeClass("scale");
      i += k;
      $(selector)
        .eq(i)
        .addClass("scale");
      $(selector).each(function() {
        $(this).css({ top: 0, zIndex: 0 });
      });
      $(selector)
        .eq(i)
        .css("z-index", 100);
      lastTop = 0;
      shiftY = e.pageY;
    };
    //
    //
    const update = list => {
      this.props.onChangeFilters(list);
    };
    //
    //
    const reset = (list, time, i) => {
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
    data: state.purchases.filteredPurchases,
    filters: state.filterPurchases
  }),
  dispatch => ({
    onChangeFilters: list => {
      dispatch({ type: "CHANGE_PRODUCT_POSITION", list });
    }
  })
)(Purchases);
