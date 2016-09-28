import React from 'react'
import { connect } from 'react-redux'
// Material ui
import { Styles } from 'material-ui'
import RaisedButton from 'material-ui/lib/raised-button'
// actions
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

const AlbergueSingle = React.createClass({

  getInitialState () {
    let state = model(this.props)
    return state
  },

  componentWillMount () {
    if (this.props.albergueId) {
      this.props.fetchOne(this.props.albergueId, 'hostel', c.FETCH_HOSTEL)
    }
  },

  componentWillReceiveProps (nextProps) {
    if (!nextProps.albergueId) {
      return
    }

    if (nextProps.albergue) {
      let { country, state, city } = nextProps.albergue

      this._onChange(country, 'country')
      this._onChange(state, 'state')
      this._onChange(city, 'city')

      let obj = model(nextProps.albergue)

      this.setState(obj)
    }
  },

  componentWillUnmount () {
    this.props.empty(c.EMPTY_HOSTEL)
  },

  onSave () {
    let data = this.state.fields
    let hostelId = this.state.fields.hostelId
    let clientId = this.props.clientId

    if (hostelId) {
      return this.props.update(clientId, hostelId, data, 'hostels', c.UPDATE_HOSTEL, 'albergues')
    }

    this.props.create(clientId, data, 'hostels', c.CREATE_HOSTEL, 'albergues')
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
      hostelName_valid,
      country_valid,
      state_valid,
      city_valid,
      street_valid,
      responsibleHostel_valid,
      responsiblePhone_valid,
      responsibleEmail_valid
    } = this.state.validates

    let title = ''
    if (this.props.client) {
      title = `Agregar albergue a: ${this.props.client.companyName}`
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
            icon='mdi mdi-home'
            backgroundColor={Styles.Colors.purple500}
            title={title}
          />
          <div style={styles.FORM_FLEX_CONTAINER}>
            <div style={{display: (this.state.fields.hostelId ? 'block' : 'none')}}>
              <GenericTextField
                disabled={TRUE}
                floatingLabelText='ID'
                style={styles.TEXT_LARGE}
                valueLink={this.valueLink('hostelId')}
              />
            </div>
            <GenericTextField
              floatingLabelText='Nombre del albergue'
              errorText={hostelName_valid}
              requiredType='required'
              style={styles.TEXT_LARGE}
              valueLink={this.valueLink('hostelName')}
              onBlur={this.onKeyDownText('hostelName', 'text')}
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
              floatingLabelText='Nombre del responsable'
              errorText={responsibleHostel_valid}
              requiredType='required'
              style={styles.TEXT_LARGE}
              valueLink={this.valueLink('responsibleHostel')}
              onBlur={this.onKeyDownText('responsibleHostel', 'text')}
            />
            <GenericTextField
              floatingLabelText='Teléfono del responsable'
              errorText={responsiblePhone_valid}
              requiredType='required'
              style={styles.TEXT_LARGE}
              valueLink={this.valueLink('responsiblePhone')}
              onBlur={this.onKeyDownText('responsiblePhone', 'text')}
            />
            <GenericTextField
              floatingLabelText='Email del responsable'
              errorText={responsibleEmail_valid}
              requiredType='emailFormat'
              style={styles.TEXT_LARGE}
              valueLink={this.valueLink('responsibleEmail')}
              onKeyDown={this.onKeyDownText('responsibleEmail', 'email')}
            />
            <GenericTextField
              floatingLabelText='Casas'
              style={styles.TEXT_X_SMALL}
              valueLink={this.valueLink('numberHouses')}
            />
            <GenericTextField
              floatingLabelText='Habitantes'
              style={styles.TEXT_X_SMALL}
              valueLink={this.valueLink('numberInhabitants')}
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
    albergueId: props.params.albergueId || null,
    albergue: state.clientData.hostel
  }
}

let HosteDetail = connect(mapStateToProps, actions)(AlbergueSingle)

export default DetailWrapper(HosteDetail)
