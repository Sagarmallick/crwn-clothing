import { createContext, useState, useEffect } from "react";

// in addCartItem we receive agument from addCartItem invoke under setCartItems
const addCartItem = (cartItems, productToAdd) => {
  // exsistingCartItem store the boolean value wether the cartItems and productToAdd same or not
  const exsistingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (exsistingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};


const removeCartItem =(cartItems, cartItemToRemove) =>{
    // exsistingCartItem store the boolean value wether the cartItems and productToAdd same or not
    const exsistingCartItem = cartItems.find(
      (cartItem) => cartItem.id === cartItemToRemove.id
    );

    if(exsistingCartItem.quantity===1){
      return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );

}

const ClearCartItem =(cartItems,cartItemToClear)=> cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  // default values
  isCartOpen: false,
  setIsCartOpen: () => {},

  //   default values
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart:()=>{},

  cartCount: 0,
  cartTotal:0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(null);
  // empty array as cartItems
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCout] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCout(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  //  addItemToCart carry [product] or [productToAdd] passed from product card
  const addItemToCart = (productToAdd) => {
    // setCartItem which is return by addCartItem
    // we passed empty cartItems and products value to addCartItem
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(ClearCartItem(cartItems, cartItemToClear));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    cartTotal,
    removeItemToCart,
    clearItemFromCart
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
