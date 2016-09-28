import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { fetchClientInfo } from '../../actions/clients'

import List from 'material-ui/lib/lists/list'
import { Styles } from 'material-ui'

import SubmenuBar from '../commons/submenu-bar.jsx'
import MenuList from './menu-list.jsx'

import {MENU_CATEGORIES} from '../commons/categories'

const BAR_MENU = {
  title: 'Detalle del cliente',
  avatar: 'mdi mdi-account-switch',
  path: '/clients'
}

let styles = {
  container: {
    width: '50px'
  },
  list: {
    background: Styles.Colors.grey200,
    height: '100%'
  },
  containerParent: {
    display: 'flex'
  },
  containerChild: {
    width: '100%'
  }
}

const FALSE_COLOR = { color: Styles.Colors.grey400 }
const TRUE_COLOR = { color: Styles.Colors.grey800 }

const ClientList = React.createClass({

  componentWillMount () {
    this.props.fetchClientInfo(this.props.clientId)
  },

  _createLink (disabled = true, ref) {
    let link = `/client-detail/${this.props.clientId}/${ref}`

    return (e) => {
      e.stopPropagation()

      if (disabled) {
        return
      }

      browserHistory.push(link)
    }
  },

  _disableItem (categoryId, item) {
    return !MENU_CATEGORIES[categoryId][item]
  },

  _colorItem (categoryId, item) {
    return MENU_CATEGORIES[categoryId][item] ? TRUE_COLOR : FALSE_COLOR
  },

  _leftMenu () {
    if (!this.props.client) {
      return
    }

    let category = this.props.client.category

    return (
      <div style={styles.container}>
        <List style={styles.list}>
          <MenuList
            title='Cliente'
            icon='mdi mdi-account-switch'
            iconStyl={TRUE_COLOR}
            onClick={this._createLink(null, '')}
          />
          <MenuList
            disabled={this._disableItem(category, 'empaque')}
            title='Empaque'
            icon='mdi mdi-store'
            iconStyl={this._colorItem(category, 'empaque')}
            onClick={
              this._createLink(this._disableItem(category, 'empaque'), 'empaques')
            }
          />
          <MenuList
            disabled={this._disableItem(category, 'uProduccion')}
            title='Unidades de Producción'
            icon='mdi mdi-leaf'
            iconStyl={this._colorItem(category, 'uProduccion')}
            onClick={
              this._createLink(this._disableItem(category, 'uProduccion'), 'unidades-produccion')
            }
          />
          <MenuList
            disabled={this._disableItem(category, 'albergue')}
            title='Albergues'
            icon='mdi mdi-home'
            iconStyl={this._colorItem(category, 'albergue')}
            onClick={
              this._createLink(this._disableItem(category, 'albergue'), 'albergues')
            }
          />
          <MenuList
            disabled={this._disableItem(category, 'estanque')}
            title='Estanques'
            icon='mdi mdi-fish'
            iconStyl={this._colorItem(category, 'estanque')}
            onClick={
              this._createLink(this._disableItem(category, 'estanque'), 'estanques')
            }
          />
          <MenuList
            disabled={this._disableItem(category, 'planta')}
            title='Plantas'
            icon='mdi mdi-food-variant'
            iconStyl={this._colorItem(category, 'planta')}
            onClick={
              this._createLink(this._disableItem(category, 'planta'), 'plantas')
            }
          />
          <MenuList
            disabled={this._disableItem(category, 'almacen')}
            title='Almacenes'
            icon='mdi mdi-temperature-celsius'
            iconStyl={this._colorItem(category, 'almacen')}
            onClick={
              this._createLink(this._disableItem(category, 'almacen'), 'almacenes')
            }
          />
          <MenuList
            disabled={this._disableItem(category, 'distribucion')}
            title='Centros de distribución'
            icon='mdi mdi-truck'
            iconStyl={this._colorItem(category, 'distribucion')}
            onClick={
              this._createLink(this._disableItem(category, 'distribucion'), 'centros-distribucion')
            }
          />
          <MenuList
            disabled={this._disableItem(category, 'laboratorio')}
            title='Laboratorios'
            icon='mdi mdi-flask-outline'
            iconStyl={this._colorItem(category, 'laboratorio')}
            onClick={
              this._createLink(this._disableItem(category, 'laboratorio'), 'laboratorios')
            }
          />
        </List>
      </div>
     )
  },

  render () {
    return (
      <div>
        <SubmenuBar {...BAR_MENU} />
        <div style={styles.containerParent}>
          {this._leftMenu()}
          <div style={styles.containerChild}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
})

function mapStateToProps (state, props) {
  return {
    clientId: props.params.clientId,
    client: state.clientData.client
  }
}

export default connect(mapStateToProps, {fetchClientInfo})(ClientList)
