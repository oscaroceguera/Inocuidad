import {
  FETCH_CATALOGS,
  CATALOGS_ERROR
} from '../actions/types'

const INITIAL_STATE = {
  all: [],
  catalog: null
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CATALOGS:
      return {
        ...state,
        all: action.payload.data,
        error: ''
      }
    case CATALOGS_ERROR:
      return {
        ...state,
        error: action.payload
      }
  }
  return state
}
