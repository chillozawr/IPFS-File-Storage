import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { addressActions } from '../store/addressSlice/addressSlice';
import { fileActions } from '../store/fileSlice/fileSlice';

const actions = {
  ...addressActions,
  ...fileActions,
};

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

export { useActions };
