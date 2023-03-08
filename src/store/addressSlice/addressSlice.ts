import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as IPFS from "ipfs-core";

export interface AddressState {
  address: string;
  // IPFSNode: any;
}

const initialState: AddressState = {
  address: "",
  // IPFSNode: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    changeAccount: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    // setNodeIPFS: (state, action: PayloadAction<any>) => {
    //   state.IPFSNode = action.payload;
    // },
  },
});

const addressActions = addressSlice.actions;
const addressReducer = addressSlice.reducer;
export { addressSlice, addressActions, addressReducer };
