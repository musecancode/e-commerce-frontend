import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

// Reducer function to manage cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        // If item already exists, increase its quantity
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Else, add new item with quantity 1
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload);

    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

// Context provider to wrap around the app
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to access cart context
export const useCart = () => useContext(CartContext);
