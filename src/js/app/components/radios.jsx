import React from "react";
import { connect } from "react-redux";

function Radios(props) {
  const { sortingData, sortingAnimation } = props;
  let filterPurchases = Object.assign({}, props.filterPurchases);
  return sortingData.map((e, i) => (
    <li key={i}>
      <label>
        <input
          defaultChecked={i === 0 ? "checked" : ""}
          type="radio"
          name="sorting"
          className="checkbox"
          onClick={() => {
            sortingAnimation();
            filterPurchases.sortingID = i;
            props.onChangeSorting(filterPurchases);
          }}
        />
        <div className="check"> </div>
        {e}
      </label>
    </li>
  ));
}

export default connect(
  state => ({
    filterPurchases: state.filterPurchases
  }),
  dispatch => ({
    onChangeSorting: filterPurchases => {
      dispatch({ type: "CHANGE_SORTING", filterPurchases });
    }
  })
)(Radios);
