import { ADD_TO_CART } from '../constants/cartConstants';

export const addToCart =
  (pizza, quantity, varient) => async (dispatch, getState) => {
    try {
      const cartItem = {
        name: pizza.name,
        _id: pizza._id,
        image: pizza.image,
        varient: pizza.vairent,
        prices: pizza.prices,
        price: pizza.prices[0][varient] * quantity,
      };

      dispatch({ type: ADD_TO_CART, payload: cartItem });

      const cartItems = getState().cart.cartItems;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {}
  };
