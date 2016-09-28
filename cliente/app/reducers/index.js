import { combineReducers } from 'redux'
import authReducer from './reducer-auth'
import UserReducer from './reducer-user'
import ModulesReducer from './reducer-modules'
import CatalogsReducer from './reducer-catalogs'
import ContactReducer from './reducer-contact'
import ClientReducer from './reducer-client'

const rootReducer = combineReducers({
  auth: authReducer,
  userData: UserReducer,
  modulesStore: ModulesReducer,
  catalogsStore: CatalogsReducer,
  contactData: ContactReducer,
  clientData: ClientReducer
})

export default rootReducer
