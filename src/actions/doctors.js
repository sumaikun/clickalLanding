import {
    GET_DOCTORS_LANDING_PAGE_RESULT
  } from "../constants";
import api from "middleware/api";

  
  
  
  function setDoctors(doctors) {
    return {
      type: GET_DOCTORS_LANDING_PAGE_RESULT,   
      payload:doctors
    };
  }
  
  export function getDoctors(cb=null) {
    
    
    return dispatch => {
      return api.getData("doctorsLandingPage")
        .then(( response ) => {

          dispatch(setDoctors(response?.data || []));
          
          if(cb) { cb(true,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
  }

  export function getDaySchedule(id,date,cb=null) {
    
    
    //return dispatch => {
      return api.getData("doctorDaySchedule"+"/"+id+"/"+date)
        .then(( response ) => {

          //dispatch(setDoctors(response?.data || []));
          
          if(cb) { cb(response,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    //}
  }


 
  
  