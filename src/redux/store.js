import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from "axios";
import logger from 'redux-logger';

const loginForm = {
    id: '',
}
const localstr = {
    localid: ""
}

export const allAction = {

    plogin: (login) => async (dispatch) => {
        const result = await axios.post(`http://localhost/`, { ...login });
        console.log(result.data.GetStudentDetailsResult.string[0]);
        dispatch({ type: 'LOGIN', id: result.data.GetStudentDetailsResult.string[0] })
        // dispatch({ type: 'LOGIN', id: login })
    }
}

const loginReducer = (data = loginForm, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...data,
                id: action.id
            }
        case "LOGOUT":
            return {
                ...data,
                id: ""
            }
    }
    return data
}


const rootReducer = combineReducers({
    psuPass: loginReducer

})

const store = createStore(rootReducer, applyMiddleware(logger, thunk))

export default store