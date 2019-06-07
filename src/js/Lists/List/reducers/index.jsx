import { combineReducers } from "redux";

import products from "./products";
import filterProducts from "./filterProducts";

export default combineReducers({
  products,
  filterProducts
});
