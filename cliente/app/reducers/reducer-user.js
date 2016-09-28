import {
  FETCH_USERS,
  FETCH_USER,
  USER_ERROR,
  DELETE_USER,
  EMPTY_USER
} from '../actions/types'

const INITIAL_STATE = {
  all: [],
  user: null
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        all: action.payload.data,
        delete: false,
        error: ''
      }
    case USER_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case FETCH_USER:
      return {
        ...state,
        user: action.payload.data
      }
    case DELETE_USER:
      return {
        ...state,
        delete: true
      }
    case EMPTY_USER:
      return {
        ...state,
        user: null
      }
  }
  return state
}
