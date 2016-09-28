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
import {model} from './model'

const TRUE = true
const FALSE = false

const UProduccionSingle = React.createClass({
  getInitialState () {
    return model(this.props)
  },

  componentWillMount () {
    if (this.props.productionId) {
      this.props.fetchOne(this.props.productionId, 'production', c.FETCH_PRODUCTION)
    }
  },

  componentWillReceiveProps (nextProps) {
    if (!nextProps.productionId) {
      return
    }
    if (nextProps.production) {
      let { country, state, city } = nextProps.production

      this._onChange(country, 'country')
      this._onChange(state, 'state')
      this._onChange(city, 'city')

      let obj = model(nextProps.production)

      this.setState(obj)
    }
  },

  componentWillUnmount () {
    this.props.empty(c.EMPTY_PRODUCTION)
  },

  onSave () {
    let data = this.state.fields
    let productionId = this.state.fields.productionId
    let clientId = this.props.clientId

    if (productionId) {
      return this.props.update(clientId, productionId, data, 'productions', c.UPDATE_PRODUCTION, 'unidades-produccion')
    }

    this.props.create(clientId, data, 'productions', c.CREATE_PRODUCTION, 'unidades-produccion')
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
    let valueLink = this.valueLink(value)
    let validField = `${value}_valid`
    let validates = this.state.validates
    return (e) => {
      let obj = aux.validateValueLinkText(valueLink, validField, validType, validates)
      this.setState(obj)
    }
  },

  _bindOnChange (item) {
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
      productionName_valid,
      country_valid,
      state_valid,
      city_valid,
      street_valid,
      pickings_valid,
      hectares_valid,
      waterOrigin_valid
    } = this.state.validates

    let title = ''
    if (this.props.client) {
      title = `Agregar unidad de producción a: ${this.props.client.companyName}`
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
            icon='mdi mdi-leaf'
            backgroundColor={Styles.Colors.green500}
            title={title}
          />
          <div style={styles.FORM_FLEX_CONTAINER}>
            <div style={{display: (this.state.fields.productionId ? 'block' : 'none')}}>
              <GenericTextField
                disabled={TRUE}
                floatingLabelText='ID'
                style={styles.TEXT_LARGE}
                valueLink={this.valueLink('productionId')}
              />
            </div>
            <GenericTextField
              floatingLabelText='Nombre de unidad de producción'
              errorText={productionName_valid}
              requiredType='required'
              style={styles.TEXT_LARGE}
              valueLink={this.valueLink('productionName')}
              onBlur={this.onKeyDownText('productionName', 'text')}
            />
            <GenericSelectField
              value={this.state.country}
              onChange={this._bindOnChange('country')}
              validField={country_valid}
              requiredType='required'
              floatingLabelText='País'
              menuItem={countries}
            />
            <GenericSelectField
              value={this.state.state}
              onChange={this._bindOnChange('state')}
              validField={state_valid}
              requiredType='required'
              floatingLabelText='Estado'
              menuItem={states}
            />
            <GenericSelectField
              value={this.state.city}
              onChange={this._bindOnChange('city')}
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
              floatingLabelText='Cultivos'
              errorText={pickings_valid}
              requiredType='required'
              style={styles.TEXT_X_LARGE}
              valueLink={this.valueLink('pickings')}
              onBlur={this.onKeyDownText('pickings', 'text')}
            />
            <GenericTextField
              floatingLabelText='Hectáreaje'
              errorText={hectares_valid}
              requiredType='required'
              style={styles.TEXT_LARGE}
              valueLink={this.valueLink('hectares')}
              onBlur={this.onKeyDownText('hectares', 'text')}
            />
            <GenericTextField
              floatingLabelText='Campo abierto (ha)'
              style={styles.TEXT_MEDIUM}
              valueLink={this.valueLink('openfields')}
            />
            <GenericTextField
              floatingLabelText='Área protegida (ha)'
              style={styles.TEXT_MEDIUM}
              valueLink={this.valueLink('greenhouses')}
            />
            <GenericTextField
              floatingLabelText='Fuentes de agua'
              errorText={waterOrigin_valid}
              requiredType='required'
              style={styles.TEXT_LARGE}
              valueLink={this.valueLink('waterOrigin')}
              onBlur={this.onKeyDownText('waterOrigin', 'text')}
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
    productionId: props.params.produccionId,
    production: state.clientData.production
  }
}

let UProductionDetail = connect(mapStateToProps, actions)(UProduccionSingle)

export default DetailWrapper(UProductionDetail)
