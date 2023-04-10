import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface files {
  files: fileState[];
  storageCapacity: number;
  searchPhrase: string;
}

export interface fileState {
  fileCID: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileURL: string;
}

export interface deleteFile {
  cid: string;
  size: number;
}

const initialState: files = {
  files: [],
  storageCapacity: 0,
  searchPhrase: '',
};

const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<fileState>) => {
      state.files.push(action.payload);
      state.storageCapacity += action.payload.fileSize;
    },
    deleteFile: (state, action: PayloadAction<deleteFile>) => {
      state.files = state.files.filter((value) => {
        value.fileCID != action.payload.cid;
      });
      state.storageCapacity -= action.payload.size;
    },
    searchFile: (state, action: PayloadAction<string>) => {
      state.searchPhrase = action.payload;
    },
  },
});

const fileActions = fileSlice.actions;
const fileReducer = fileSlice.reducer;
export { fileSlice, fileActions, fileReducer };
