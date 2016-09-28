import * as c from '../actions/types'

const INITIAL_STATE = {
  all: [],
  client: null,
  packings: [],
  packing: null,
  productions: [],
  production: null,
  hostels: [],
  hostel: null,
  ponds: [],
  pond: null,
  storages: [],
  storage: null,
  laboratories: [],
  laboratory: null,
  plants: [],
  plant: null,
  storehouses: [],
  storehouse: null
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case c.FETCH_CLIENTS:
      return {
        ...state,
        all: action.payload.data
      }
    case c.FETCH_CLIENT:
      return {
        ...state,
        client: action.payload.data
      }
    case c.FETCH_PACKINS:
      return {
        ...state,
        packings: action.payload.data
      }
    case c.FETCH_PACKING:
      return {
        ...state,
        packing: action.payload.data
      }
    case c.DELETE_PACKING:
      return {
        ...state,
        packingDelete: true
      }
    case c.EMPTY_PACKING:
      return {
        ...state,
        packing: null
      }
    case c.FETCH_PRODUCTIONS:
      return {
        ...state,
        productions: action.payload.data
      }
    case c.FETCH_PRODUCTION:
      return {
        ...state,
        production: action.payload.data
      }
    case c.DELETE_PRODUCTION:
      return {
        ...state,
        productionDelete: true
      }
    case c.EMPTY_PRODUCTION:
      return {
        ...state,
        production: null
      }
    case c.FETCH_HOSTELS:
      return {
        ...state,
        hostels: action.payload.data
      }
    case c.FETCH_HOSTEL:
      return {
        ...state,
        hostel: action.payload.data
      }
    case c.DELETE_HOSTEL:
      return {
        ...state,
        hostelDelete: true
      }
    case c.EMPTY_HOSTEL:
      return {
        ...state,
        hostel: null
      }
    case c.FETCH_PONDS:
      return {
        ...state,
        ponds: action.payload.data
      }
    case c.FETCH_POND:
      return {
        ...state,
        pond: action.payload.data
      }
    case c.DELETE_POND:
      return {
        ...state,
        pondDelete: true
      }
    case c.EMPTY_POND:
      return {
        ...state,
        pond: null
      }
    case c.FETCH_STORAGES:
      return {
        ...state,
        storages: action.payload.data
      }
    case c.FETCH_STORAGE:
      return {
        ...state,
        storage: action.payload.data
      }
    case c.DELETE_STORAGE:
      return {
        ...state,
        storageDelete: true
      }
    case c.EMPTY_STORAGE:
      return {
        ...state,
        storage: null
      }
    case c.FETCH_LABORATORIES:
      return {
        ...state,
        laboratories: action.payload.data
      }
    case c.FETCH_LABORATORY:
      return {
        ...state,
        laboratory: action.payload.data
      }
    case c.DELETE_LABORATORY:
      return {
        ...state,
        laboratoryDelete: true
      }
    case c.EMPTY_LABORATORY:
      return {
        ...state,
        laboratory: null
      }
    case c.FETCH_PLANTS:
      return {
        ...state,
        plants: action.payload.data
      }
    case c.FETCH_PLANT:
      return {
        ...state,
        plant: action.payload.data
      }
    case c.DELETE_PLANT:
      return {
        ...state,
        plantDelete: true
      }
    case c.EMPTY_PLANT:
      return {
        ...state,
        plant: null
      }
    case c.FETCH_STOREHOUSES:
      return {
        ...state,
        storehouses: action.payload.data
      }
    case c.FETCH_STOREHOUSE:
      return {
        ...state,
        storehouse: action.payload.data
      }
    case c.DELETE_STOREHOUSE:
      return {
        ...state,
        storehouseDelete: true
      }
    case c.EMPTY_STOREHOUSE:
      return {
        ...state,
        storehouse: null
      }
  }
  return state
}
