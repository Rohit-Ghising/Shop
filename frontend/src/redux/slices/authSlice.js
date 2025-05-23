import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//Retrive user info and token from localStorage
 const userFromStorage =localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem("userInfo")):null
 //Check for existing guest id in the local Storage or generete new One
 const initialGuestId = localStorage.getItem("guestId") || `guest_${new Date().getTime()}`
 localStorage.setItem(guestId, initialGuestId)

 //Initial State
 const initialState ={
  user:userFromStorage,
  guestId:initialGuestId,
  loading:false,
  error:null,
 }
 //Async thunk for User Login
 export const loginUser = createAsyncThunk("auth/loginUser",async(userData, {rejectWithValue})=>{
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`,userData)
    localStorage.setItem('userInfo', JSON.stringify(response.data.user))
    localStorage.setItem('userToken', response.data.token)
    
  } catch (error) {
    
  }
 })