let a =
  "Какой-то текст какой-то текст какой-то nекст какой-то Какой-то текст какой-то текст какой-то nекст какой-то Какой-то текст какой-то текст какой-то nекст какой-то Какой-то текст какой-то текст какой-то nекст какой-то Какой-то текст какой-то текст какой-то nекст какой-то Какой-то текст какой-то текст какой-то nекст какой-то Какой-то текст какой-то текст какой-то nекст какой-то ";
let AllPurchases = [
  {
    title:
      "Оперативная память Corsair Vengeance LPX [CMK64GX4M8A2666C16] 64 ГБ",
    new: true,
    rating: 0.98,
    numberRatings: 30,
    price: 61999,
    isDiscount: true,
    percentageDiscount: 40,
    priceDiscount: 38299,
    about: a,
    isRead: false,
    id: 0
  },
  {
    imgUrl: "./img/products/2.jpg",
    title: "Оперативная память Corsair Dominator Platinum ROG Edition 32 ГБ",
    urgency: true,
    new: true,
    rating: 0,
    numberRatings: 0,
    price: 42000,
    isDiscount: false,
    about: a,
    isRead: false,
    id: 1
  },
  {
    imgUrl: "./img/products/3.jpg",
    title: "Оперативная память Ballistix Tactical [BLT4C4G4D26AFTA] 16 ГБ",
    urgency: true,
    rating: 0.9,
    numberRatings: 20,
    price: 14299,
    isDiscount: true,
    percentageDiscount: 25,
    priceDiscount: 10799,
    about: a,
    isRead: false,
    id: 2
  },
  {
    imgUrl: "./img/products/4.jpg",
    title: "Оперативная память Corsair Vengeance LPX [CMK8GX4M1A2400C16] 8 ГБ",
    specialOffers: {},
    rating: 0.98,
    numberRatings: 30,
    price: 3150,
    isDiscount: false,
    about: a,
    isRead: false,
    id: 3
  },
  {
    imgUrl: "./img/products/5.jpg",
    title: "Оперативная память Kingston HyperX Savage [HX316C9SRK2/8] 8 ГБ",
    new: true,
    rating: 0.7,
    numberRatings: 50,
    price: 5799,
    isDiscount: true,
    percentageDiscount: 10,
    priceDiscount: 5199,
    about: a,
    isRead: false,
    id: 4
  }
].sort((a, b) => {
  var price = ["price", "price"];
  if (a.isDiscount) price[0] = "priceDiscount";
  if (b.isDiscount) price[1] = "priceDiscount";
  return a[price[0]] > b[price[1]] ? 1 : -1;
});
const sortOrder = ["isDiscount", "urgency", "new"];
export default function purchases(state = AllPurchases, action) {
  //
  const sortingPurchases = (purchases, filterPurchases) =>
    purchases.sort((a, b) => {
      var price = ["price", "price"];
      if (a.isDiscount) price[0] = "priceDiscount";
      if (b.isDiscount) price[1] = "priceDiscount";
      switch (filterPurchases.sortingID) {
        case 0: {
          return a[price[0]] > b[price[1]] ? 1 : -1;
        }
        case 1: {
          return a[price[0]] < b[price[1]] ? 1 : -1;
        }
        case 2: {
          return a["rating"] < b["rating"] ? 1 : -1;
        }
      }
    });
  //
  const filterPurchases = (data, filters) => {
    let purchases =
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
        purchases = purchases.filter(e => {
          for (let j = 0; j < filters[sortOrder[i]].length; j++) {
            if (filters[sortOrder[i]][j] == e[sortOrder[i]]) return true;
          }
          return false;
        });
    }
    return purchases;
  };
  switch (action.type) {
    case "ADD_PRODUCT": {
      AllPurchases = [Object.assign({}, action.newPurchase), ...AllPurchases];
      AllPurchases = sortingPurchases(AllPurchases, action.filterPurchases);
      let data = AllPurchases.slice();
      data = filterPurchases(data, action.filterPurchases);
      return data;
    }
    case "REMOVE_PRODUCT": {
      let data = state.filter(e => {
        return e.id != action.id;
      });
      AllPurchases = AllPurchases.filter(e => {
        return e.id != action.id;
      });
      return data;
    }
    case "CHANGE_PRODUCT_POSITION": {
      return action.list.slice();
    }
    case "CHANGE_SORTING": {
      let data = [...state];
      AllPurchases = sortingPurchases(AllPurchases, action.filterPurchases);
      data = sortingPurchases(data, action.filterPurchases);
      return data;
    }
    case "CHANGE_FILTERS": {
      let data = AllPurchases.slice();

      data = filterPurchases(data, action.filters);
      return data;
    }
    case "CLEAR_FILTERS": {
      let data = AllPurchases.slice();
      return data;
    }
    default: {
      return state;
    }
  }
}
// let products =
//   filters["price"] !== undefined
//     ? data.filter(e => {
//       return e["isDiscount"]
//         ? e["priceDiscount"] >= filters["price"][0] &&
//         e["priceDiscount"] <= filters["price"][1]
//         : e["price"] >= filters["price"][0] &&
//         e["price"] <= filters["price"][1];
//     })
//     : data.slice();
// for (let i = 0; i < sortOrder.length; i++) {
//   if (filters[sortOrder[i]] !== undefined && filters[sortOrder[i]].length)
//     products = products.filter(e => {
//       for (let j = 0; j < filters[sortOrder[i]].length; j++) {
//         if (filters[sortOrder[i]][j] == e[sortOrder[i]]) return true;
//       }
//       return false;
//     });
// }
