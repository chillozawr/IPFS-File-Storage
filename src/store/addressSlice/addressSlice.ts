import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AddressState {
  address: string;
}

const initialState: AddressState = {
  address: '',
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    changeAccount: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
  },
});

const addressActions = addressSlice.actions;
const addressReducer = addressSlice.reducer;
export { addressSlice, addressActions, addressReducer };
