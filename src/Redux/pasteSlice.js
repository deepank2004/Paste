import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem('pastes')
    ? JSON.parse(localStorage.getItem('pastes'))
    : [],
};

export const pasteSlice = createSlice({
  name: 'pasters',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem('pastes', JSON.stringify(state.pastes));
      toast.success("Paste created successfully");
    },

    updateToPastes: (state, action) => {
      const updatedPaste = action.payload;

      if (!updatedPaste || !updatedPaste._id) {
        toast.error("Invalid paste data");
        return;
      }

      const index = state.pastes.findIndex(
        (item) => String(item._id) === String(updatedPaste._id)
      );

      if (index !== -1) {
        state.pastes[index] = {
          ...state.pastes[index],
          ...updatedPaste,
        };
        localStorage.setItem('pastes', JSON.stringify(state.pastes));
        toast.success("Paste updated successfully");
      } else {
        toast.error("Paste not found for update");
      }
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex(
        (item) => String(item._id) === String(pasteId)
      );

      if (index !== -1) {
        state.pastes.splice(index, 1);
        localStorage.setItem('pastes', JSON.stringify(state.pastes));
        toast.success("Paste deleted");
      } else {
        toast.error("Paste not found for deletion");
      }
    },

    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem('pastes');
      toast.success("All pastes cleared");
    },
  },
});

export const {
  addToPastes,
  updateToPastes,
  resetAllPastes,
  removeFromPastes,
} = pasteSlice.actions;

export default pasteSlice.reducer;
