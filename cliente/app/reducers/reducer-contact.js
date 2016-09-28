import {
  FETCH_CONTACTS,
  DELETE_CONTACT,
  FETCH_CONTACT_INFO,
  FETCH_LAB,
  FETCH_DIST,
  EMPTY_CONTACT,
  FETCH_AAP
} from '../actions/types'

const INITIAL_STATE = {
  all: [],
  contact: null,
  aap: null,
  lab: null,
  dist: null
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CONTACTS:
      return {
        ...state,
        all: action.payload.data
      }
    case FETCH_CONTACT_INFO:
      return {
        ...state,
        contact: action.payload.data
      }
    case FETCH_AAP:
      return {
        ...state,
        aap: action.payload.data
      }
    case FETCH_LAB:
      return {
        ...state,
        lab: action.payload.data
      }
    case FETCH_DIST:
      return {
        ...state,
        dist: action.payload.data
      }
    case DELETE_CONTACT:
      return {
        ...state,
        delete: true
      }
    case EMPTY_CONTACT:
      return {
        ...state,
        contact: null,
        lab: null,
        aap: null,
        dist: null
      }
  }
  return state
}
