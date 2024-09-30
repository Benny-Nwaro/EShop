import {SET_CURRENT_USER, SUCCESSFUL_REGISTER, ERRORS, FAILURE_REGISTER, AUTH_FAILURE, SUCCESSFUL_LOGIN, FAILURE_LOGIN, LOGOUT} from "../actions/types";
import {isEmpty} from "lodash"

const initialState = {
    isAutenticated : false,
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
                isAutenticated : isEmpty(payload),
                user : payload
            }
        case SUCCESSFUL_REGISTER:
            localStorage.setItem("token", payload.token);
            return{
                ...state,
                ...payload,
                isAutenticated : true
            }
        case SUCCESSFUL_LOGIN:
            localStorage.setItem("token", payload.token);
            return{
                ...state,
                ...payload,
                isAutenticated : true
            }
        case FAILURE_REGISTER : 
        case AUTH_FAILURE:
        case FAILURE_LOGIN:
        case LOGOUT:
        localStorage.removeItem("token");
            return{
                ...state,
                token : null,
                isAutenticated : false,
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