import { ACTION_NAMES } from './types'

const initialState = {
    isAuthenticated: false,
    user: {},
    todos: {}
}

const reducers = (state = initialState, action) => {
    switch(action.type){
        case ACTION_NAMES.REGISTER:
            return {
                ...state
            }
        case ACTION_NAMES.SET_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        case ACTION_NAMES.ADD_TODO:
            return {
                ...state
            }
        case ACTION_NAMES.FETCH_TODO:
            return {
                ...state,
                todos: action.todos
            }
        case ACTION_NAMES.UPDATE_TODO:
            return {
                ...state
            }
        case ACTION_NAMES.DELETE_TODO:
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}

export default reducers