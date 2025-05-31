// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";import axios from "axios";
//  //Helper function to load cart from localStorage
//  const loadCartFromStorage = ()=>{
//   const storedCart =localStorage.getItem("cart")
//   return  storedCart ? JSON.parse(storedCart):{products:[]}
//  }
// //Helper function to save cart to localStorage
// const saveCartToStorage = (cart)=>{
//   localStorage.setItem("cart", JSON.stringify(cart))
// }

// //Fetch Cart for user and guest
// export const fetchCart = createAsyncThunk("cart/fetchCart",async({userId,guestId},{rejectWithValue})=>{
//   try {
//     const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
// params:{userId,guestId}

//     })
//     return response.data
//   } catch (error) {
//     console.error(error)
//     return rejectWithValue(error.response.data);
    
    
//   }
// })
// //Add Item to tyhe cart
//  export const addToCart = createAsyncThunk("cart/addToCart",async ({productId,quantity,size,color,guestId,userId},{rejectWithValue})=>{
//   try {
//     const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
//       productId,quantity,size,color,guestId,userId
//     })
//     return response.data
//   } catch (error) {
    
//     return rejectWithValue(error.response.data)
//   }
//  })
//  //update the quantiyt the of cart

//  export const  updateCartItemQuantity = createAsyncThunk("cart/updateCartItemQuantity",async({productId,quantity, guestId,userId,size,color},{rejectWithValue})=>{
//   try {
//     const response =  await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
//       productId,quantity, guestId,userId,size,color

//     })
//     return response.data
//   } catch (error) {
//     return rejectWithValue(error.response.data)
    
//   }
//  })
//  //Remove an item from cart
//   export const removeFromCart = createAsyncThunk('cart/removeFromCart',async({productId,guestId,userId,size,color},{rejectWithValue})=>{
//     try {
//       const response = await axios.delete({
//         method:"DELETE",
//         url:`${import.meta.env.VITE_BACKEND_URL}/api/cart/`,
//         data:{productId,guestId,userId,size,color}
//       })
//       return response.data
      
//     } catch (error) {
//       return rejectWithValue(rejectWithValue(error.response.data))
//     }
//   })
//   //Merge the guest cart into logged in cart
//    export const mergeCart =createAsyncThunk("cart/mergeCart",async({guestId,user},{rejectWithValue})=>{
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,{guestId,user},
//         {
//           headers:{
//             Authorization:`Bearer ${localStorage.getItem("userToken")}`
//           }
//         }
//       )
//       return response.data
      
      
//     } catch (error) {
//       return rejectWithValue(error.response.data)
      
//     }
//    })


//    const cartSlice = createSlice({
//     name:"cart",
//     initialState:{
//       cart:loadCartFromStorage(),
//       loading:false,
//       error:null
//     },
//     reducers:{
//       clearCart:(state)=>{
//         state.cart = {products:[]}
//         localStorage.removeItem("cart")
//       }
//     },
//     extraReducers:(builder)=>{
//       builder
//       .addCase(fetchCart.pending, (state)=>{
//         state.loading=true
//         state.error = null
//       })
//       .addCase(fetchCart.fulfilled, (state,action)=>{
//         state.loading=false
//         state.cart = action.payload
//         saveCartToStorage(action.payload)
//       })
//       .addCase(fetchCart.rejected, (state,action)=>{
//         state.loading=false
//         state.error = action.error.message||"Failed to Fetch Cart"
//       })
//       //------------------------------------
//       .addCase(addToCart.pending, (state)=>{
//         state.loading=true
//         state.error = null
//       })
//       .addCase(addToCart.fulfilled, (state,action)=>{
//         state.loading=false
//         state.cart = action.payload
//         saveCartToStorage(action.payload)
//       })
//       .addCase(addToCart.rejected, (state,action)=>{
//         state.loading=false
//         state.error = action.payload?.message||"Failed to Add Cart"
//       })
//       //-------------------------------------
//       .addCase(updateCartItemQuantity.pending, (state)=>{
//         state.loading=true
//         state.error = null
//       })
//       .addCase(updateCartItemQuantity.fulfilled, (state,action)=>{
//         state.loading=false
//         state.cart = action.payload
//         saveCartToStorage(action.payload)
//       })
//       .addCase(updateCartItemQuantity.rejected, (state,action)=>{
//         state.loading=false
//         state.error = action.payload?.message||"Failed to Update Item Quantity to Cart"
//       })
//       //-------------------------------------
//       .addCase(removeFromCart.pending, (state)=>{
//         state.loading=true
//         state.error = null
//       })
//       .addCase(removeFromCart.fulfilled, (state,action)=>{
//         state.loading=false
//         state.cart = action.payload
//         saveCartToStorage(action.payload)
//       })
//       .addCase(removeFromCart.rejected, (state,action)=>{
//         state.loading=false
//         state.error = action.payload?.message||"Failed to Remove Cart"
//       })
//       ///---------------------
//       .addCase(mergeCart.pending, (state)=>{
//         state.loading=true
//         state.error = null
//       })
//       .addCase(mergeCart.fulfilled, (state,action)=>{
//         state.loading=false
//         state.cart = action.payload
//         saveCartToStorage(action.payload)
//       })
//       .addCase(mergeCart.rejected, (state,action)=>{
//         state.loading=false
//         state.error = action.payload?.message||"Failed to TRemove Cart"
//       })
//     }
//    })

//    export const {clearCart} = cartSlice.actions
//    export default cartSlice.reducer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper: Load cart from localStorage
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { products: [] };
};

// Helper: Save cart to localStorage
const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch cart for user or guest
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        params: { userId, guestId },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Failed to fetch cart");
    }
  }
);

// Add item to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity, size, color, guestId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        productId,
        quantity,
        size,
        color,
        guestId,
        userId,
      });
      console.log('this is database',response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add to cart");
    }
  }
);

// Update item quantity in the cart
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity, guestId, userId, size, color }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        productId,
        quantity,
        guestId,
        userId,
        size,
        color,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update cart item");
    }
  }
);

// Remove item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, guestId, userId, size, color }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        data: { productId, guestId, userId, size, color },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to remove item from cart");
    }
  }
);

// Merge guest cart into logged-in user cart
export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ guestId, user }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        { guestId, user },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to merge carts");
    }
  }
);

// Slice definition
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [] };
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch cart";
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add to cart";
      })

      // Update Cart Item
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update item quantity";
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to remove item";
      })

      // Merge Cart
      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to merge cart";
      });
  },
});

// Selectors (optional)
export const selectCart = (state) => state.cart.cart;
export const selectCartItemsCount = (state) =>
  state.cart.cart.products.reduce((acc, item) => acc + item.quantity, 0);
export const selectCartTotalPrice = (state) =>
  state.cart.cart.products.reduce((acc, item) => acc + item.quantity * item.price, 0);

// Actions & Reducer
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
