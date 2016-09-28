import axios from 'axios'
import { browserHistory } from 'react-router'

import * as c from '../types'


/*  > > > > > >  DYNAMIC FUNCTIONS - CREATE  < < < < < <
** apiRoute = 'packings'
** action = 'CREATE_PACKING'
** pushRoute = 'empaques'
*/

export function create (id, props, apiRoute, action, pushRoute) {
  let data = props

  return function (dispatch) {
    axios
    .post(`${c.ROOT_URL}/${apiRoute}/${id}`,
      data,
      {headers: {Auth: localStorage.getItem('token')}
    })
    .then((response) => {
      dispatch({type: action})
      browserHistory.push(`/client-detail/${id}/${pushRoute}`)
    })
    .catch((response) => {
      console.log('create', response)
    })
  }
}

/*  > > > > > >  DYNAMIC FUNCTIONS - FETCH ALL  < < < < < <
** apiRoute = 'packings'
** action = 'FETCH_PACKINGS'
*/
export function fetchAll (id, apiRoute, action) {
  return function (dispatch) {
    axios.get(`${c.ROOT_URL}/${apiRoute}/${id}`, {
      headers: {Auth: localStorage.getItem('token')}
    })
    .then((response) => {
      dispatch({
        type: action,
        payload: response
      })
    })
    .catch((response) => {
      console.log('fetchAll', response)
    })
  }
}

/*  > > > > > >  DYNAMIC FUNCTIONS - FETCH ONE  < < < < < <
** apiRoute = 'packings'
** action = 'FETCH_PACKING'
*/
export function fetchOne (id, apiRoute, action) {
  return function (dispatch) {
    axios.get(`${c.ROOT_URL}/${apiRoute}/${id}`, {
      headers: {Auth: localStorage.getItem('token')}
    })
    .then((response) => {
      dispatch({
        type: action,
        payload: response
      })
    })
    .catch((response) => {
      console.log('fetchOne', response)
    })
  }
}

/*  > > > > > >  DYNAMIC FUNCTIONS - UPDATE  < < < < < <
** apiRoute = 'packings'
** action = 'FETCH_PACKING'
** pushRoute = 'empaques'
*/
export function update (clientId, packingId, props, apiRoute, action, pushRoute) {
  let data = props
  return function (dispatch) {
    axios
    .put(`${c.ROOT_URL}/${apiRoute}/${packingId}`,
      data,
      {headers: {Auth: localStorage.getItem('token')}
    })
    .then((response) => {
      dispatch({type: action})
      browserHistory.push(`/client-detail/${clientId}/${pushRoute}`)
    })
    .catch((response) => {
      console.log('update', response)
    })
  }
}

/*  > > > > > >  DYNAMIC FUNCTIONS - EMPTY  < < < < < <
** action = 'EMPTY_PACKING'
*/
export function empty (action) {
  return {
    type: action
  }
}

/*  > > > > > >  DYNAMIC FUNCTIONS - DELETE  < < < < < <
** apiRoute = 'packings'
** action = 'FETCH_PACKING'
** pushRoute = 'empaques'
*/
export function deleteItem (id, apiRoute, action) {
  return function (dispatch) {
    axios.delete(`${c.ROOT_URL}/${apiRoute}/${id}`,
      { headers: { Auth: localStorage.getItem('token') } }
    ).then((response) => {
      dispatch({type: action})
    }).catch((response) => {
      console.log('delete', response)
    })
  }
}

/* ----------------------------------------------------------------------------
** CLIENTS
*/

// POST - CLIENT
export function createClient (props) {
  let data = props
  return function (dispatch) {
    axios
    .post(`${c.ROOT_URL}/clients`,
      data,
      {headers: {Auth: localStorage.getItem('token')}
    })
    .then((response) => {
      dispatch({type: c.CREATE_CLIENT})
      browserHistory.push('/clients')
    })
    .catch((resonse) => {
      console.log('createClient', resonse)
    })
  }
}

// UPDATE - CLIENTS
export function updateClient (id, props) {
  let data = props
  return function (dispatch) {
    axios
    .put(`${c.ROOT_URL}/clients/${id}`,
      data,
      {headers: {Auth: localStorage.getItem('token')}
    })
    .then((response) => {
      dispatch({type: c.UPDATE_CLIENT})
      browserHistory.push('/clients')
    })
    .catch((response) => {
      console.log('updateClient', response)
    })
  }
}

// GET - CLIENTS
export function fetchClients (props) {
  return function (dispatch) {
    axios.get(`${c.ROOT_URL}/clients`, {
      headers: {Auth: localStorage.getItem('token')}
    })
    .then((response) => {
      dispatch({
        type: c.FETCH_CLIENTS,
        payload: response
      })
    })
    .catch((response) => {
      console.log('fetchClients', response);
    })
  }
}

// GET - CLIENT INFO
export function fetchClientInfo (id) {
  return function (dispatch) {
    axios.get(`${c.ROOT_URL}/clients/${id}`, {
      headers: {Auth: localStorage.getItem('token')}
    })
    .then((response) => {
      dispatch({
        type: c.FETCH_CLIENT,
        payload: response
      })
    })
    .catch((response) => {
      console.log('fetchClientInfo', response);
    })
  }
}
