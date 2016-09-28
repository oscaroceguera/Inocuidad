import axios from 'axios'
import { browserHistory } from 'react-router'
import _ from 'lodash'

import {
  FETCH_USERS,
  FETCH_USER,
  CREATE_USER,
  ROOT_URL,
  UPDATE_USER,
  USER_ERROR,
  DELETE_USER,
  EMPTY_USER
} from '../types'

// Get - USERS
export function fetchUsers () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/admin/users`, {
      headers: {Auth: localStorage.getItem('token')}
    })
    .then((response) => {
      dispatch({
        type: FETCH_USERS,
        payload: response
      })
    })
    .catch((response) => {
      dispatch(userError(`Users ${response.statusText}`))
    })
  }
}

// Get - USER/:ID
export function fetchUser (id) {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/admin/users/${id}`, {
      headers: {Auth: localStorage.getItem('token')}
    }).then((response) => {
      dispatch({
        type: FETCH_USER,
        payload: response
      })
    })
  }
}

// Save - USER
export function createUser (props) {
  let data = {
    name: props.name,
    first_surname: props.firstSurname,
    second_surname: props.secondSurname,
    email: props.email,
    password: props.pass,
    modules: props.modules
  }

  return function (dispatch) {
    axios.post(
      `${ROOT_URL}/admin/users`,
      data,
      { headers: { Auth: localStorage.getItem('token') } }
    ).then((response) => {
      dispatch({type: CREATE_USER})
      browserHistory.push('/users')
    }).catch((response) => {
      let messageError = _.map(response.data.errors, (x) => { return x.message })
      dispatch(userError(messageError))
    })
  }
}

// Update - USER
export function updateUser (id, props) {
  let data = {
    name: props.name,
    first_surname: props.firstSurname,
    second_surname: props.secondSurname,
    email: props.email,
    modules: props.modules
  }
  return function (dispatch) {
    axios.put(`${ROOT_URL}/admin/users/${id}`,
      data,
        { headers: { Auth: localStorage.getItem('token') } }
    ).then((response) => {
      dispatch({type: UPDATE_USER})
      browserHistory.push('/users')
    }).catch((response) => {
      let messageError = _.map(response.data.errors, (x) => { return x.message })
      dispatch(userError(messageError))
    })
  }
}

// Delete - USER
export function deteleteUser (id) {
  return function (dispatch) {
    axios.delete(`${ROOT_URL}/admin/users/${id}`,
      { headers: { Auth: localStorage.getItem('token') } }
    ).then((response) => {
      dispatch({type: DELETE_USER})
    }).catch((response) => {
      let messageError = _.map(response.data.errors, (x) => { return x.message })
      dispatch(userError(messageError))
    })
  }
}

export function userError (messageError) {
  return {
    type: USER_ERROR,
    payload: messageError
  }
}

export function emptyUser () {
  return {
    type: EMPTY_USER
  }
}
