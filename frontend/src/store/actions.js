import axios from 'axios'
import config from '../utils/config'
import jwt_decode from 'jwt-decode'

import setAuthToken from '../utils/setAuthToken'
import { ACTION_NAMES } from './types'

export const register = userData => dispatch => {
    axios.post(`${config.api}user/register`, userData)
    .then(res => {
        if(res.statusText === "OK"){
            dispatch({ 
                type: ACTION_NAMES.REGISTER
            });
            window.location.href = '/'
        }
    })
    .catch(err => {
        dispatch({
            type: ACTION_NAMES.AUTH_ERROR
        })
    })
}
// Login Get User Token
export const loginUser = userData => dispatch => {
    axios.post(`${config.api}user/login`, userData)
        .then(res => {
            //save to localstore
            const { token } = res.data
            //set token to localstorage which takes string
            localStorage.setItem('_secret_', token)
            //set token auth header
            setAuthToken(token);
            // decode the token set the user
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => console.log(err))
}

export const setCurrentUser = decoded => {
    return {
        type: ACTION_NAMES.SET_USER,
        payload: decoded
    }
}

export const logoutUser = () => dispatch => {
    //remove token from localstorage
    localStorage.removeItem('_secret_')
    //remove auth header for future requests
    setAuthToken(false)
    //set current user to {} which will also set to isAuthentication to false
    dispatch(setCurrentUser({}))
    // redirect to login
    window.location.href = '/'
}

export const addTodo = data => dispatch => {
    axios.post(`${config.api}todo`, data,{
        headers: { Authorization: `Bearer ${axios.defaults.headers.common['x-access-token']}` }
    })
    .then(res => {
        if(res.statusText === "OK"){
            dispatch({ 
                type: ACTION_NAMES.ADD_TODO
            });
            dispatch(getTodos())
        }
    })
    .catch(err => console.log(err))
}

export const getTodos = () => dispatch => {
    axios.get(`${config.api}todo`,{
        headers: { Authorization: `Bearer ${axios.defaults.headers.common['x-access-token']}` }
    })
    .then(res => {
        console.log(res.data, " res.data ")
        if(res.statusText === "OK"){
            dispatch({ 
                type: ACTION_NAMES.FETCH_TODO,
                todos: res.data
            });
        }
    })
    .catch(err => console.log(err))
}

export const updateTodo = data => dispatch => {
    axios.put(`${config.api}todo/${data._id}`, data,{
        headers: { Authorization: `Bearer ${axios.defaults.headers.common['x-access-token']}` }
    })
    .then(res => {
        if(res.statusText === "OK"){
            dispatch({ 
                type: ACTION_NAMES.UPDATE_TODO
            });
            dispatch(getTodos())
        }
    })
    .catch(err => console.log(err))
}

export const deleteTodo = id => dispatch => {
    axios.delete(`${config.api}todo/${id}`,{
        headers: { Authorization: `Bearer ${axios.defaults.headers.common['x-access-token']}` }
    })
    .then(res => {
        if(res.statusText === "OK"){
            dispatch({ 
                type: ACTION_NAMES.DELETE_TODO
            });
            dispatch(getTodos())
        }
    })
    .catch(err => console.log(err))
}
