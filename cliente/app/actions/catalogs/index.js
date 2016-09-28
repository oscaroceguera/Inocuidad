import axios from 'axios'

import { FETCH_CATALOGS, CATALOGS_ERROR, ROOT_URL } from '../types'

// Get - Catalogs
export function fetchCatalogs () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/catalogs`, {
      headers: {Auth: localStorage.getItem('token')}
    })
    .then((response) => {
      dispatch({
        type: FETCH_CATALOGS,
        payload: response
      })
    })
    .catch((response) => {
      dispatch(catalogsError(`Catalogs ${response.statusText}`))
    })
  }
}

export function catalogsError (messageError) {
  return {
    type: CATALOGS_ERROR,
    payload: messageError
  }
}

// Get - CATALOGS?catalog=catalogId&parent=parentId
