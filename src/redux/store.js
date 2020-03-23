import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from "axios";
import logger from 'redux-logger';

const loginForm = {
    id: '',
}

const postForm = {
    activity: '',
    address: '',
    date: '',
    name: '',
    hours: 0,
    people: 0
}



export const allAction = {

    plogin: (login) => async (dispatch) => {
        const result = await axios.post(`http://localhost/`, { ...login });
        console.log(result.data.GetStudentDetailsResult.string[0]);
        dispatch({ type: 'LOGIN', id: result.data.GetStudentDetailsResult.string[0] })
        // dispatch({ type: 'LOGIN', id: login })
    },

    plogout: () => async (dispatch) => {
        dispatch({ type: "LOGOUT" })
    },
    getPost: () => async (dispatch) => {
        const response = await axios.get(`http://localhost/`)
        const responseBody = await response.data;
        console.log('response: ', responseBody)
        dispatch({ type: "GET_POST", posts: responseBody });
    },
    addPost: (from) => async (dispatch) => {
        const result = await axios.post(`http://localhost/post/`, from)
        console.log(from);
        dispatch({ type: "ADD_POST", post: from })

    },

    change_activity: (n) => ({ type: 'CHANGE_ACTIVI', activity: n }),
    change_address: (n) => ({ type: 'CHANGE_ADDRESS', address: n }),
    change_date: (n) => ({ type: 'CHANGE_DATE', date: n }),
    change_name: (n) => ({ type: 'CHANGE_NAME', name: n }),
    change_hours: (n) => ({ type: 'CHANGE_HOURS', hours: n }),
    change_people: (n) => ({ type: 'CHANGE_PEOPLE', people: n }),

}

const loginReducer = (data = loginForm, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...data,
                id: action.id,
            }
        case "LOGOUT":
            return {
                ...data,
                id: "",

            }
    }
    return data
}

const postReducer = (data = [], action) => {
    switch (action.type) {
        case "GET_POST":
            return action.posts
        case "ADD_POST":
            return [...data, action.post]
    }
    return data
}

const formReducer = (data = postForm, action) => {
    switch (action.type) {
        case "CHANGE_ACTIVI":
            return {
                ...data,
                activity: action.activity
            }
        case "CHANGE_ADDRESS":
            return {
                ...data,
                address: action.address
            }
        case "CHANGE_DATE":
            return {
                ...data,
                date: action.date
            }
        case "CHANGE_NAME":
            return {
                ...data,
                name: action.name
            }
        case "CHANGE_HOURS":
            return {
                ...data,
                hours: action.hours
            }
        case "CHANGE_PEOPLE":
            return {
                ...data,
                people: action.people
            }
    }

    return data
}


const rootReducer = combineReducers({
    psuPass: loginReducer,
    form: formReducer,
    postreduc: postReducer

})

const store = createStore(rootReducer, applyMiddleware(logger, thunk))

export default store