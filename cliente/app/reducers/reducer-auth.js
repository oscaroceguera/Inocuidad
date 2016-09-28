import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_SESSION
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        error: '',
        authenticated: true,
        session: action.payload
      }
    case UNAUTH_USER:
      return {
        ...state,
        authenticated: false
      }
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case FETCH_SESSION:
      return {
        ...state,
        session: action.payload
      }
  }
  return state
}
