import React from "react";

function Checkboxes(props) {
  return props.data.map((e, i) => {
    i++;
    return (
      <li key={i}>
        <label>
          <input
            className="input"
            onClick={() => {
              props.onChangeCheckbox(props.meta, i);
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

export default Checkboxes;
