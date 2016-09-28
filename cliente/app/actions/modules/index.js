import axios from 'axios'

import { FETCH_MODULES, MODULE_ERROR, ROOT_URL } from '../types'

// Get - MODULES
export function fetchModules () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/modules`, {
      headers: {Auth: localStorage.getItem('token')}
    }).then((response) => {
      dispatch({
        type: FETCH_MODULES,
        payload: response
      })
    })
    .catch((response) => {
      dispatch(moduleError(`Modules ${response.statusText}`))
    })
  }
}

export function moduleError (error) {
  return {
    type: MODULE_ERROR,
    payload: error
  }
}
