import { combineReducers } from "redux";

import purchases from "./reducers/purchases";
import filterPurchases from "./reducers/filterPurchases";

export default combineReducers({
  purchases,
  filterPurchases
});
