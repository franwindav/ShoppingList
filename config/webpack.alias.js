const path = require("path");
const src = path.join(__dirname, "../src");
module.exports = {
  IMG: `${src}/img`,
  Styles: `${src}/styles`,
  ShoppingList: `${src}/js/app/shoppingList`,
  Components: `${src}/js/app/components`,
  Purchases: `${src}/js/app/shoppingList/purchases`,
  SVG: `${src}/js/svg`,
  StoreWithShoppingList: `${src}/js/stores/storeWithShoppingList`,
  StoreWithShoppingLists: `${src}/js/stores/storeWithShoppingLists`
};
