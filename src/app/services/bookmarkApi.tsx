// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../index";

// interface BookmarkState {
//   data: Array<any>;
// }

// const initialState: BookmarkState = {
//   data: [],
// };

// export const bookmarkSlice = createSlice({
//   name: "bookmark",
//   initialState,
//   reducers: {
//     createBookmark: (state, action) => {
//       const { book } = action.payload;

//       const items = [...state.data].slice();

//       let productAlreadyInCart = false;

//       items.forEach((item: any) => {
//         if (item.id === book.id) {
//           productAlreadyInCart = true;
//         }
//       });

//       if (!productAlreadyInCart) {
//         items.push({ ...book });
//       }

//       localStorage.setItem("bookmarkItems", JSON.stringify(state.data));
//       state.data = items;
//     },
//     removeBookmark: (state, action) => {
//       const { book } = action.payload;

//       const items = [...state.data].slice(book);

//       console.log("items", items);

//       localStorage.setItem("bookmarkItems", JSON.stringify(items));
//       // state.data = items;
//     },
//   },
// });

// export const { createBookmark, removeBookmark } = bookmarkSlice.actions;

// export const selectBookmark = ({ bookmark }: RootState) => bookmark.data;

export const createBookmark = (items: any, product: any) => (dispatch: any) => {
  console.log("items", items);
  console.log("product", product);

  const cartItems = items.slice();
  let productAlreadyInCart = false;

  cartItems.forEach((cp: any) => {
    if (cp.id === product.id) {
      productAlreadyInCart = true;
    }
  });

  if (!productAlreadyInCart) {
    cartItems.push({ ...product });
  }

  localStorage.setItem("bookmarkItems", JSON.stringify(cartItems));
  dispatch({ type: "CREATE_BOOKMARK", payload: { cartItems } });
};

export const removeBookmark = (items: any, product: any) => (dispatch: any) => {
  const cartItems = items.slice().filter((a: any) => a.id !== product.id);
  localStorage.setItem("bookmarkItems", JSON.stringify(cartItems));
  dispatch({ type: "REMOVE_BOOKMARK", payload: { cartItems } });
};

const initialState = {
  data: [],
};

export const bookmarkReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "CREATE_BOOKMARK":
      return { ...state, data: action.payload.cartItems };
    case "REMOVE_BOOKMARK":
      return { ...state, data: action.payload.cartItems };

    default:
      return state;
  }
};
