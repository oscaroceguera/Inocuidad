import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchCatalogs } from '../../../actions/catalogs'
import { updateClient, fetchClientInfo } from '../../../actions/clients'
import {model} from '../model-client'
import * as styles from '../../commons/styles'
import * as aux from '../../commons/aux-functions'
import RaisedButton from 'material-ui/lib/raised-button'
import General from '../singles/general.jsx'
import Legal from '../singles/legal.jsx'
import InChargeFS from '../singles/in-charge-fs.jsx'

const ClientInfo = React.createClass({

  getInitialState () {
    let state = model(this.props)
    return state
  },

  componentWillMount () {
    this.props.fetchCatalogs()
    this.props.fetchClientInfo(this.props.clientId)
  },

  componentWillReceiveProps (nextProps) {
    if (!nextProps.clientId) {
      return
    }

    if (nextProps.client) {
      let { country } = nextProps.client

      this._onChange(country, 'country')

      let obj = model(nextProps.client)

      this.setState(obj)
    }
  },

  _onChange (value, key) {
    let obj = this.state.fields
    obj[key] = value
    this.setState(obj)

    let country = key === 'country'
    let state = key === 'state'
    let city = key === 'city'

    if (country || state || city) {
      let localities = aux.validLocalities(key, this.state.validates)
      this.setState(localities)
    }
  },

	// LinkState with validate fields option
  // key: it's a field name; section: section; required: field required; type: validate type
  linkClientState (key, section = null, required = false, type = null) {
    return {
      value: this.state.fields[key],
      requestChange: (value) => {
        let obj = this.state.fields
        obj[key] = value
        this.setState(obj)

        if (required) {
          this._validates(section, key, type)
        }
      }
    }
  },

  _validates (section, item, type) {
    let sectionState = this.state[section]
    let itemState = this.state.fields[item]

    let itemValid = aux.validateSections(sectionState, item, itemState, type)

    this.setState(itemValid)
  },

  _getValueLinks () {
    return {
      general: {
        companyName: this.linkClientState('companyName', 'validates', true, 'text'),
        rfc: this.linkClientState('rfc', 'validates', true, 'rfc'),
        locality: this.linkClientState('locality'),
        street: this.linkClientState('street', 'validates', true, 'text'),
        number: this.linkClientState('number'),
        suburb: this.linkClientState('suburb'),
        zipCode: this.linkClientState('zipCode'),
        companyEmail: this.linkClientState('companyEmail', 'validates', true, 'email'),
        companyPhone: this.linkClientState('companyPhone', 'validates', true, 'text')
      },
      legal: {
        legalName: this.linkClientState('legalName', 'validates', true, 'text'),
        legalPhone: this.linkClientState('legalPhone', 'validates', true, 'text'),
        legalEmail: this.linkClientState('legalEmail', 'validates', true, 'email')
      },
      inChargeFS: {
        inChargeFSName: this.linkClientState('inChargeFSName', 'validates', true, 'text'),
        inChargeFSPhone: this.linkClientState('inChargeFSPhone', 'validates', true, 'text'),
        inChargeFSEmail: this.linkClientState('inChargeFSEmail', 'validates', true, 'email')
      }
    }
  },

  _basicCatalogs (name, isParent = false) {
    let catalogs = this.props.catalogs
    let state = this.state[name]

    return aux.basicCatalogs(name, catalogs, state, isParent)
  },

  _errorText (validItem, requiredType) {
    let state = this.state.validates[validItem]
    return aux.errorTextSelect(state, requiredType)
  },

  _showSubmit () {
    let { validates } = this.state

    let defaultValid = _.every(_.values(validates))

    let parentValid = (defaultValid) ? true :  false

    if (!parentValid) {
      return
    }

    return true
  },

  onUpdate () {
    let data = this.state.fields
    this.props.updateClient(this.state.fields.clientId, data)
  },

  render () {
    let valueLinks = this._getValueLinks()
    let showSubmit = this.state.showSubmit
    showSubmit = this._showSubmit()

    return (
      <div>
        <div style={styles.FORM}>
          <General
            id={this.state.fields.clientId}
            errorText={this._errorText}
            countries={this._basicCatalogs('countries')}
            states={this._basicCatalogs('country', true)}
            cities={this._basicCatalogs('state', true)}
            values={this.state.fields}
            valueLinks={valueLinks['general']}
            onChange={this._onChange}
          />
          <Legal
            errorText={this._errorText}
            valueLinks={valueLinks['legal']}
          />
          <InChargeFS
            errorText={this._errorText}
            valueLinks={valueLinks['inChargeFS']}
          />
        </div>
        <div className='save__btn'>
          <RaisedButton
            label='Actualizar'
            primary={true}
            onMouseDown={this.onUpdate}
            disabled={showSubmit ? false : true}
          />
        </div>
      </div>
    )
  }
})

function mapStateToProps (state, props) {
  return {
    catalogs: state.catalogsStore.all,
    clientId: props.params.clientId,
    client: state.clientData.client
  }
}

export default connect(
  mapStateToProps, {
    fetchCatalogs,
    updateClient,
    fetchClientInfo
  })(ClientInfo)
