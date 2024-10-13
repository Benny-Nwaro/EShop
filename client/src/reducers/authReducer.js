import {SET_CURRENT_USER, SUCCESSFUL_REGISTER, ERRORS, FAILURE_REGISTER, AUTH_FAILURE, SUCCESSFUL_LOGIN, FAILURE_LOGIN, LOGOUT} from "../actions/types";
import {isEmpty} from "lodash"

const initialState = {
    isAuthenticated : localStorage.getItem("token")?true:false,
    token : localStorage.getItem("token"),
    errors : [],
    user: {}
}
const authReducer =  (state = initialState, action) => {
    const {payload} = action;
    switch(action.type){
        case SET_CURRENT_USER:
            return{
                ...state,
                isAuthenticated : isEmpty(payload),
                user : payload
            }
        case SUCCESSFUL_REGISTER:
            localStorage.setItem("token", payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated : true
            }
        case SUCCESSFUL_LOGIN:
            localStorage.setItem("token", payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated : true
            }
        case FAILURE_REGISTER : 
        case AUTH_FAILURE:
        case FAILURE_LOGIN:
        case LOGOUT:
        localStorage.removeItem("token");
            return{
                ...state,
                token : null,
                isAuthenticated : false,
            }
            
        case ERRORS:
            return{
                ...state,
                errors : payload,
            }
        default: return state;
    }
}
export default authReducer;