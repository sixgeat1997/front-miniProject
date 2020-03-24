import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import axios from "axios";
import logger from 'redux-logger';

const loginForm = {
    id: '',
    name: '',
    surname: '',
}

const postForm = [{
    activity: '',
    address: '',
    date: '',
    name: '',
    hours: 0,
    people: 0
}]



export const allAction = {

    plogin: (login) => async (dispatch) => {
        const result = await axios.post(`http://localhost/`, { ...login });
        console.log(result.data.GetStudentDetailsResult);
        const [id, name, surname] = [...result.data.GetStudentDetailsResult.string]
        dispatch({ type: 'LOGIN', id: id, name: name, surname: surname })
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
    deletePost: (index) => async (dispatch) => {
        const result = await axios.delete(`http://localhost/delete/${index.id}`, index)
        dispatch({ type: "DELETE_POST", id: index.id })
    },

    updatePost: (post) => async (dispatch) => {
        await axios.put(`http://localhost/update/${post.id}`, post)
        dispatch({ type: 'UPDATE_POST', post: post, id: post.id })
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
                id: "5935512038",
                name: action.name,
                surname: action.surname
            }
        case "LOGOUT":
            return {
                ...data,
                id: "",
                name: '',
                surname: ''

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
        case "DELETE_POST":
            return data.filter(post => +action.id !== +post.id)
        case "UPDATE_POST":
            return data.map(post => {
                if (+post.id === +action.id)
                    return action.post
                else
                    return post
            })
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


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)))


export default store