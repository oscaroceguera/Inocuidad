import axios from 'axios'
import { browserHistory } from 'react-router'
import {
	AUTH_USER,
	UNAUTH_USER,
	AUTH_ERROR,
	FETCH_MESSAGE,
  ROOT_URL,
  FETCH_SESSION
} from '../types'

export function signinUser ({ email: email, password: password }) {
  return function (dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/login`, { email, password })
      .then((response) => {
        // If reques is good...
        // 1. Update state to indicate user is authenticated
        dispatch({
          type: AUTH_USER,
          payload: response.data.user
        })
        // 2. Save the jwt token
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        // 3. Redirect to the route '/panel'
        browserHistory.push('/panel')
      })
      .catch(() => {
        // If request is bad, show an error to the user
        dispatch(authError('Datos de sesión incorrectos'))
      })
  }
}

// export function signupUser ({ email, password }) {
//   return function (dispatch) {
//     axios.post(`${ROOT_URL}/signup`, {email, password})
//       .then((response) => {
//         dispatch({type: AUTH_USER})
//         localStorage.setItem('token', response.data.token)
//         browserHistory.push('/feacture')
//       })
//       .catch((response) => dispatch(authError(response.data.error)))
//   }
// }

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

// export function sessionDispatch (user) {
//   return {
//     type: FETCH_SESSION,
//     payload: user
//   }
// }

export function signoutUser () {
  localStorage.removeItem('token')

  return {
    type: UNAUTH_USER
  }
}

export function currentSession () {
  var user = JSON.parse(localStorage.getItem('user'))
  return {
    type: FETCH_SESSION,
    payload: user
  }
}

// export function fetchMessage () {
//   return function (dispatch) {
//     axios.get(ROOT_URL, {
//       headers: { Auth: localStorage.getItem('token') }
//     })
//       .then((response) => {
//         dispatch({
//           type: FETCH_MESSAGE,
//           payload: response.data.message
//         })
//       })
//   }
// }
