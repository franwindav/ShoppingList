let a =
  "Какой-то текст какой-то текст какой-то nекст какой-то Какой-то текст какой-то текст какой-то nекст какой-то Какой-то текст какой-то текст какой-то nекст какой-то Какой-то текст какой-то текст какой-то nекст какой-то Какой-то текст какой-то текст какой-то nекст какой-то Какой-то текст какой-то текст какой-то nекст какой-то Какой-то текст какой-то текст какой-то nекст какой-то ";
let initialState = [
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
];
export default function products(state = initialState, action) {
  switch (action.type) {
    case "ADD_PRODUCT": {
      let data = [Object.assign({}, action.newProduct), ...state];
      return data;
    }
    case "REMOVE_PRODUCT": {
      let data = state.filter(e => {
        return e.id != action.id;
      });
      return data;
    }
    default: {
      return state;
    }
  }
}
