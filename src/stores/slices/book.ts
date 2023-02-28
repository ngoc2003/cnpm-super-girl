import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

function setDataLocalStorage(result) {
  localStorage.setItem('carts_libraryManagement', JSON.stringify(result));
}

const initialState = localStorage.getItem('carts_libraryManagement')
  ? JSON.parse(localStorage.getItem('carts_libraryManagement'))
  : [];

const addBook = (state, action) => {
  if (state.length < 5) {
    toast.success('Add successfully', {
      pauseOnHover: false,
      autoClose: 1000,
      progressClassName: 'bg-primary',
    });
    state.push(action.payload);
    setDataLocalStorage(state);
  } else {
    toast.error('Maximum cart length! ', {
      pauseOnHover: false,
      autoClose: 1000,
      progressClassName: 'bg-error',
    });
  }
};

const removeBook = (state, action) => {
  toast.success('Remove successfully', {
    pauseOnHover: false,
    autoClose: 1000,
    progressClassName: 'bg-primary',
  });
  const index = state.findIndex((item) => item._id === action.payload);
  state.splice(index, 1);
  setDataLocalStorage(state);
};

const clearStore = (state) => {
  state.splice(0, state.length);
  console.log(state);
  setDataLocalStorage(state);
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    add: addBook,
    remove: removeBook,
    clear: clearStore,
  },
});

export const bookReducer = bookSlice.reducer;

export const bookActions = bookSlice.actions;
