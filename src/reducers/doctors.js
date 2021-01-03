import {
  GET_DOCTORS_LANDING_PAGE,
  GET_DOCTORS_LANDING_PAGE_RESULT,
  SELECT_DOCTOR
} from "../constants";


export function doctors(
  state = {
    doctors:[],  
    loading: false,   
    selectedDoctor:{} 
  },
  action
) {
  switch (action.type) {

    case GET_DOCTORS_LANDING_PAGE:
      
      return Object.assign({}, state, {
        loading:true,
        doctors:action.payload,         
      });

    case GET_DOCTORS_LANDING_PAGE_RESULT:

      console.log("action",action)

      return Object.assign({}, state, {
        doctors:action.payload,         
      });

    case SELECT_DOCTOR:

      return Object.assign({}, state, {
        selectedDoctor:action.payload,         
      });

    default:
      return state;


  }
}