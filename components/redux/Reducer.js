import AsyncStorage from "@react-native-async-storage/async-storage";
import { DECREMENT, INCREMENT, LOAD } from "./ActionTypes";
const state = 5;
export default counterReducer = (state = 0, action) => {
  let hold = 0;
  switch (action.type) {
    case INCREMENT:
      hold = state + action.payload;
      return hold;
    case DECREMENT:
      hold = state - action.payload;
      return hold;
    case LOAD:
      return action.payload;
    default:
      return state;
  }
};
