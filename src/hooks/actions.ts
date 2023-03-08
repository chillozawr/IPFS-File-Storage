import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addressActions } from "../store/addressSlice/addressSlice";

const actions = {
  ...addressActions,
};

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

export { useActions };
