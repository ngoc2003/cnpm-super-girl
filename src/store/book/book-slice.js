import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

function setDataLocalStorage(result) {
  localStorage.setItem('carts_libraryManagement', JSON.stringify(result));
}
const bookSlice = createSlice({
  name: 'book',
  initialState: localStorage.getItem('carts_libraryManagement')
    ? JSON.parse(localStorage.getItem('carts_libraryManagement'))
    : [],
  reducers: {
    add: (state, action) => {
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
    },
    remove: (state, action) => {
      toast.success('Remove successfully', {
        pauseOnHover: false,
        autoClose: 1000,
        progressClassName: 'bg-primary',
      });
      const index = state.findIndex((item) => item._id === action.payload);
      state.splice(index, 1);
      setDataLocalStorage(state);
    },
    clear: (state) => {
      state.splice(0, state.length);
      console.log(state);
      setDataLocalStorage(state);
    },
  },
});

export const { add, remove, clear } = bookSlice.actions;

export default bookSlice.reducer;
