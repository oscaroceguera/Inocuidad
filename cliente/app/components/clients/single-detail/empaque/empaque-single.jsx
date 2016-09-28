import React from 'react'
import { connect } from 'react-redux'
// Material ui
import { Styles } from 'material-ui'
import RaisedButton from 'material-ui/lib/raised-button'
// Actions
import * as actions from '../../../../actions/clients'
import * as c from '../../../../actions/types'
// components & commons
import { DetailWrapper } from '../../../hocs/single-complementary-detail.jsx'
import GenericTextField from '../../../commons/generic-text-field.jsx'
import GenericSelectField from '../../../commons/generic-select-field.jsx'
import * as styles from '../../../commons/styles'
import Avatar from '../../../commons/generic-avatar.jsx'
import * as aux from '../../../commons/aux-functions'
import { model } from './model'

const TRUE = true
const FALSE = false

const EmpaqueSingle = React.createClass({

  getInitialState () {
    return model(this.props)
  },

  componentWillMount () {
    if (this.props.packingId) {
      this.props.fetchOne(this.props.packingId, 'packing', c.FETCH_PACKING)
    }
  },

  componentWillReceiveProps (nextProps) {
    if (!nextProps.packingId) {
      return
    }

    if (nextProps.packing) {
      let { country, state, city } = nextProps.packing

      this._onChange(country, 'country')
      this._onChange(state, 'state')
      this._onChange(city, 'city')

      let obj = model(nextProps.packing)

      this.setState(obj)
    }
  },

  componentWillUnmount () {
    this.props.empty(c.EMPTY_PACKING)
  },

  onSave () {
    let data = this.state.fields
    let packingId = this.state.fields.packingId
    let clientId = this.props.clientId

    if (packingId) {
      return this.props.update(clientId, packingId, data, 'packings', c.UPDATE_PACKING, 'empaques')
    }

    this.props.create(clientId, data, 'packings', c.CREATE_PACKING, 'empaques')
  },

  valueLink (key) {
    return {
      value: this.state.fields[key],
      requestChange: (value) => {
        let obj = this.state.fields
        obj[key] = value
        this.setState(obj)
      }
    }
  },

  onKeyDownText (value, validType) {
    let validField = `${value}_valid`
    let valueLink = this.valueLink(value)
    let validates = this.state.validates
    return (e) => {
      let obj = aux.validateValueLinkText(valueLink, validField, validType, validates)
      this.setState(obj)
    }
  },

  bindOnChange (item) {
    return (event, index, value) => {
      this._onChange(value, `${item}`)
    }
  },

  _onChange (value, key) {
    let obj = aux.onChange(value, key, this.state.fields)
    this.setState(obj)

    let country = key === 'country'
    let state = key === 'state'
    let city = key === 'city'

    if (country || state || city) {
      let localities = aux.validLocalities(key, this.state.validates)
      this.setState(localities)
    }
  },

  render () {
    let {
      packingName_valid,
      street_valid,
      products_valid,
      country_valid,
      state_valid,
      city_valid
    } = this.state.validates

    let title = ''
    if (this.props.client) {
      title = `Agregar empaque a: ${this.props.client.companyName}`
    }

    let countries = this.props.basicCatalogs('countries', this.state.country)
    let states = this.props.basicCatalogs('country', this.state.country, true)
    let cities = this.props.basicCatalogs('state', this.state.state, true)

    let showSubmit = this.state.showSubmit
    showSubmit = aux.showSubmit(this.state.validates, this.state.fields)

    return (
      <div>
        <div style={styles.FORM}>
          <Avatar
            icon='mdi mdi-store'
            backgroundColor={Styles.Colors.purple500}
            title={title}
          />
          <div style={styles.FORM_FLEX_CONTAINER}>
            <div style={{display: (this.state.fields.packingId ? 'block' : 'none')}}>
              <GenericTextField
                disabled={TRUE}
                floatingLabelText='ID'
                style={styles.TEXT_LARGE}
                valueLink={this.valueLink('packingId')}
                />
            </div>
            <GenericTextField
              floatingLabelText='Nombre del empaque'
              errorText={packingName_valid}
              requiredType='required'
              style={styles.TEXT_LARGE}
              valueLink={this.valueLink('packingName')}
              onBlur={this.onKeyDownText('packingName', 'text')}
            />
            <GenericSelectField
              value={this.state.country}
              onChange={this.bindOnChange('country')}
              validField={country_valid}
              requiredType='required'
              floatingLabelText='País'
              menuItem={countries}
            />
            <GenericSelectField
              value={this.state.state}
              onChange={this.bindOnChange('state')}
              validField={state_valid}
              requiredType='required'
              floatingLabelText='Estado'
              menuItem={states}
            />
            <GenericSelectField
              value={this.state.city}
              onChange={this.bindOnChange('city')}
              validField={city_valid}
              requiredType='required'
              floatingLabelText='Municipio'
              menuItem={cities}
            />
            <GenericTextField
              floatingLabelText='Localidad'
              style={styles.TEXT_LARGE}
              valueLink={this.valueLink('locality')}
            />
            <GenericTextField
              floatingLabelText='Calle'
              errorText={street_valid}
              requiredType='required'
              style={styles.TEXT_LARGE}
              valueLink={this.valueLink('street')}
              onBlur={this.onKeyDownText('street', 'text')}
            />
            <GenericTextField
              floatingLabelText='Número'
              style={styles.TEXT_X_SMALL}
              valueLink={this.valueLink('number')}
            />
            <GenericTextField
              floatingLabelText='Colonia'
              style={styles.TEXT_MEDIUM}
              valueLink={this.valueLink('neighborhood')}
            />
            <GenericTextField
              floatingLabelText='C.P.'
              style={styles.TEXT_X_SMALL}
              valueLink={this.valueLink('zipCode')}
            />
            <GenericTextField
              floatingLabelText='Latitud'
              style={styles.TEXT_X_SMALL}
              valueLink={this.valueLink('latitude')}
            />
            <GenericTextField
              floatingLabelText='Longitud'
              style={styles.TEXT_X_SMALL}
              valueLink={this.valueLink('longitude')}
            />
            <GenericTextField
              floatingLabelText='Teléfono'
              style={styles.TEXT_SMALL}
              valueLink={this.valueLink('phone')}
            />
            <GenericTextField
              floatingLabelText='Productos'
              errorText={products_valid}
              requiredType='required'
              style={styles.TEXT_LARGE}
              valueLink={this.valueLink('products')}
              onBlur={this.onKeyDownText('products', 'text')}
            />
            <GenericTextField
              floatingLabelText='Vol. Producción (Toneladas)'
              style={styles.TEXT_MEDIUM}
              valueLink={this.valueLink('volumeProduction')}
            />
            <GenericTextField
              floatingLabelText='Mercado nacional %'
              style={styles.TEXT_SMALL}
              valueLink={this.valueLink('marketNational')}
            />
            <GenericTextField
              floatingLabelText='Mercado internacional %'
              style={styles.TEXT_SMALL}
              valueLink={this.valueLink('marketInternational')}
            />
            <GenericTextField
              floatingLabelText='Empleados base'
              style={styles.TEXT_SMALL}
              valueLink={this.valueLink('employeeBase')}
            />
            <GenericTextField
              floatingLabelText='Empleados eventuales'
              style={styles.TEXT_SMALL}
              valueLink={this.valueLink('employeeEventual')}
            />
          </div>
        </div>
        <div className='save__btn'>
          <RaisedButton
            label='Guardar'
            primary={TRUE}
            onMouseDown={this.onSave}
            disabled={showSubmit ? FALSE : TRUE}
          />
        </div>
      </div>
    )
  }
})

function mapStateToProps (state, props) {
  return {
    clientId: props.clientId,
    client: props.client,
    packingId: props.params.empaqueId || null,
    packing: state.clientData.packing
  }
}

let EmpaqueDetail = connect(mapStateToProps, actions)(EmpaqueSingle)

export default DetailWrapper(EmpaqueDetail)
