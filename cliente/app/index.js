import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import reduxThunk from 'redux-thunk'
injectTapEventPlugin()

import './styles/app.styl'

import reducers from './reducers'
import App from './components/app.jsx'
import Signin from './components/auth/signin.jsx'
import ForgotPassword from './components/forgot-password/forgot-password.jsx'
import RequireAuth from './components/auth/require-auth'
import Panel from './components/main-panel.jsx'
import UserList from './components/users/user-list.jsx'
import UserSingle from './components/users/user-single.jsx'
import ContactSingle from './components/contact/Contact-single.jsx'
import ContactList from './components/contact/Contact-list.jsx'
import ContactInfo from './components/contact/Contact-info.jsx'
import ClientSingle from './components/clients/client-single.jsx'
import ClientList from './components/clients/client-list.jsx'
import ClientDetail from './components/clients/client-detail.jsx'
import ClientInfo from './components/clients/single-detail/client-info.jsx'
import EmpaqueSingle from './components/clients/single-detail/empaque/empaque-single.jsx'
import EmpaqueList from './components/clients/single-detail/empaque/empaque-list.jsx'
import UProduccionList from './components/clients/single-detail/unidades-produccion/unidades-produccion-list.jsx'
import UProduccionSingle from './components/clients/single-detail/unidades-produccion/unidades-produccion-single.jsx'
import AlbergueList from './components/clients/single-detail/albergues/albergues-list.jsx'
import AlbergueSingle from './components/clients/single-detail/albergues/albergues-single.jsx'
import EstanquesList from './components/clients/single-detail/estanques/estanques-list.jsx'
import EstanquesSingle from './components/clients/single-detail/estanques/estanques-single.jsx'
import PlantasList from './components/clients/single-detail/planta/planta-list.jsx'
import PlantasSingle from './components/clients/single-detail/planta/planta-single.jsx'
import AlmacenesList from './components/clients/single-detail/almacen/almacen-list.jsx'
import AlmacenesSingle from './components/clients/single-detail/almacen/almacen-single.jsx'
import CDistribucionList from './components/clients/single-detail/centros-distribucion/centros-distribucion-list.jsx'
import CDistribucionSingle from './components/clients/single-detail/centros-distribucion/centros-distribucion-single.jsx'
import LaboratoriosList from './components/clients/single-detail/laboratorio/laboratorios-list.jsx'
import LaboratoriosSingle from './components/clients/single-detail/laboratorio/laboratorios-single.jsx'
import { AUTH_USER } from './actions/types'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

const token = localStorage.getItem('token')

// if we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({type: AUTH_USER})
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Signin} />
        <Route path='/forgot-password' component={ForgotPassword}/>
        <Route path='/panel' component={RequireAuth(Panel)}/>
        <Route path='/users' component={RequireAuth(UserList)}/>
        <Route path='/users-new' component={RequireAuth(UserSingle)}/>
        <Route path='/users-edit/:userId' component={RequireAuth(UserSingle)} />
        <Route path='/contacts' component={RequireAuth(ContactList)}/>
        <Route path='/contacts-new' component={RequireAuth(ContactSingle)} />
        <Route path='/contacts-info/:contactId/:categoryId' component={RequireAuth(ContactInfo)} />
        <Route path='/clients' component={RequireAuth(ClientList)}/>
        <Route path='/clients-new' component={RequireAuth(ClientSingle)}/>
        <Route path='/client-detail/:clientId' component={RequireAuth(ClientDetail)}>
          <IndexRoute component={RequireAuth(ClientInfo)}/>
          <Route path='/client-detail/:clientId/empaques' component={RequireAuth(EmpaqueList)}/>
          <Route path='/client-detail/:clientId/empaques-new' component={RequireAuth(EmpaqueSingle)}/>
          <Route path='/client-detail/:clientId/empaques-edit/:empaqueId' component={RequireAuth(EmpaqueSingle)} />
          <Route path='/client-detail/:clientId/unidades-produccion' component={RequireAuth(UProduccionList)}/>
          <Route path='/client-detail/:clientId/unidades-produccion-new' component={RequireAuth(UProduccionSingle)}/>
          <Route path='/client-detail/:clientId/unidades-produccion-edit/:produccionId' component={RequireAuth(UProduccionSingle)}/>
          <Route path='/client-detail/:clientId/albergues' component={RequireAuth(AlbergueList)}/>
          <Route path='/client-detail/:clientId/albergues-new' component={RequireAuth(AlbergueSingle)}/>
          <Route path='/client-detail/:clientId/albergues-edit/:albergueId' component={RequireAuth(AlbergueSingle)}/>
          <Route path='/client-detail/:clientId/estanques' component={RequireAuth(EstanquesList)}/>
          <Route path='/client-detail/:clientId/estanques-new' component={RequireAuth(EstanquesSingle)}/>
          <Route path='/client-detail/:clientId/estanques-edit/:estanqueId' component={RequireAuth(EstanquesSingle)}/>
          <Route path='/client-detail/:clientId/plantas' component={RequireAuth(PlantasList)}/>
          <Route path='/client-detail/:clientId/plantas-new' component={RequireAuth(PlantasSingle)}/>
          <Route path='/client-detail/:clientId/plantas-edit/:plantaId' component={RequireAuth(PlantasSingle)}/>
          <Route path='/client-detail/:clientId/almacenes' component={RequireAuth(AlmacenesList)}/>
          <Route path='/client-detail/:clientId/almacenes-new' component={RequireAuth(AlmacenesSingle)}/>
          <Route path='/client-detail/:clientId/almacenes-edit/:almacenId' component={RequireAuth(AlmacenesSingle)}/>
          <Route path='/client-detail/:clientId/centros-distribucion' component={RequireAuth(CDistribucionList)}/>
          <Route path='/client-detail/:clientId/centros-distribucion-new' component={RequireAuth(CDistribucionSingle)}/>
          <Route path='/client-detail/:clientId/centros-distribucion-edit/:distId' component={RequireAuth(CDistribucionSingle)}/>
          <Route path='/client-detail/:clientId/laboratorios' component={RequireAuth(LaboratoriosList)}/>
          <Route path='/client-detail/:clientId/laboratorios-new' component={RequireAuth(LaboratoriosSingle)}/>
          <Route path='/client-detail/:clientId/laboratorios-edit/:labId' component={RequireAuth(LaboratoriosSingle)}/>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
