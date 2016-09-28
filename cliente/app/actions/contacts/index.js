import axios from 'axios'
import { browserHistory } from 'react-router'

import {
  CREATE_CONTACT,
  FETCH_CONTACTS,
  DELETE_CONTACT,
  FETCH_CONTACT_INFO,
  FETCH_AAP,
  FETCH_LAB,
  FETCH_DIST,
  EMPTY_CONTACT,
  ROOT_URL
} from '../types'

// Get - CONTACTS
export function fetchContacts () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/contacts`, {
      headers: {Auth: localStorage.getItem('token')}
    })
    .then((response) => {
      dispatch({
        type: FETCH_CONTACTS,
        payload: response
      })
    })
    .catch((response) => {
      console.log('fetchContacts', response)
    })
  }
}

// Get - CONTACT INFO
export function fetchContactInfo (id) {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/contacts/${id}`, {
      headers: {Auth: localStorage.getItem('token')}
    })
    .then((response) => {
      dispatch({
        type: FETCH_CONTACT_INFO,
        payload: response
      })
    })
    .catch((response) => {
      console.log('fetchContactInfo', response)
    })
  }
}

// Save - Contact
export function createContact (props) {
  let data = props
  return function (dispatch) {
    axios.post(
      `${ROOT_URL}/contacts`,
      data,
      {headers: {Auth: localStorage.getItem('token')} }
    ).then((response) => {
      dispatch({type: CREATE_CONTACT})
      browserHistory.push('/contacts')
    }).catch((response) => {
      console.log('createContact', response)
    })
  }
}

// Delete - Contact
export function deleteContact (id) {
  return function (dispatch) {
    axios.delete(`${ROOT_URL}/contacts/${id}`,
      { headers: { Auth: localStorage.getItem('token') } }
    ).then((response) => {
      dispatch({type: DELETE_CONTACT})
    }).catch((response) => {
      console.log('deleteContact', response)
    })
  }
}

// GET - Contact AAP by id
export function fetchContactAap (id) {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/contacts/aap/${id}`, {
      headers: {Auth: localStorage.getItem('token')}
    })
    .then((response) => {
      dispatch({
        type: FETCH_AAP,
        payload: response
      })
    })
    .catch((response) => {
      console.log('fetchContactAap', response)
    })
  }
}

// GET - Contact LAB by id
export function fetchContactLab (id) {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/contacts/lab/${id}`, {
      headers: {Auth: localStorage.getItem('token')}
    })
    .then((response) => {
      dispatch({
        type: FETCH_LAB,
        payload: response
      })
    })
    .catch((response) => {
      console.log('fetchContactLab', response)
    })
  }
}

// GET - Contact DIST by id
export function fetchContactDist (id) {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/contacts/dist/${id}`, {
      headers: {Auth: localStorage.getItem('token')}
    })
    .then((response) => {
      dispatch({
        type: FETCH_DIST,
        payload: response
      })
    })
    .catch((response) => {
      console.log('fetchContactDist', response)
    })
  }
}

export function empty () {
  return {
    type: EMPTY_CONTACT
  }
}
