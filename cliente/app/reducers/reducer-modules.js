import { FETCH_MODULES, MODULE_ERROR } from '../actions/types'

const INITIAL_STATE = {
  all: [],
  module: null
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_MODULES:
      return {
        ...state,
        all: action.payload.data,
        error: ''
      }
    case MODULE_ERROR:
      return {
        ...state,
        error: action.payload
      }
  }

  return state
}
