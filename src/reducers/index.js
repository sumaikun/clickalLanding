import { combineReducers } from "redux";
import { doctors } from "./doctors";
//import { patients } from "./patients";
//import { appointments } from "./appointments"

const reducers = combineReducers({
  doctors,
  //patients,
  //appointments,
});

export default reducers;