import React from 'react'
import TextField from 'material-ui/lib/text-field'
import {
  SelectField,
  MenuItem
} from 'material-ui'
import * as styles from '../../commons/styles'
import Avatar from '../../commons/generic-avatar.jsx'
import { Styles } from 'material-ui'

const General = React.createClass({
  getReferenceFor (name) {
    return this.props.valueLinks[name]
  },

  _onChange (item) {
    return (event, index, value) => {
      this.props.onChange(value, `${item}`)
    }
  },

  _errorText (validItem, requiredType) {
    return this.props.errorText(validItem, requiredType)
  },

  render () {
    return (
      <div>
        <Avatar
          icon='mdi mdi-factory'
          backgroundColor={Styles.Colors.purple500}
          title='Generales de la empresa'
        />
        <div style={styles.FORM_FLEX_CONTAINER}>
          <div style={{display: (this.props.id ? 'block' : 'none')}}>
            <TextField
              disabled={true}
              floatingLabelText='ID'
              style={styles.TEXT_LARGE}
              value={this.props.id}
            />
          </div>
          <TextField
            floatingLabelText='Nombre de la empresa'
            style={styles.TEXT_LARGE}
            valueLink={this.getReferenceFor('companyName')}
            errorText={this._errorText('companyName_valid', 'required')}
          />
          <TextField
            floatingLabelText='RFC'
            style={styles.TEXT_SMALL}
            valueLink={this.getReferenceFor('rfc')}
            errorText={this._errorText('rfc_valid', 'rfcFormat')}
          />
          <SelectField
            value={this.props.values.country}
            onChange={this._onChange('country')}
            errorText={this._errorText('country_valid', 'required')}
            autoWidth={true}
            style={styles.SELECT}
            floatingLabelText='País'>
            {
              this.props.countries.map((country, index) => {
                return (
                  <MenuItem key={index} value={country.id} primaryText={country.value} />
                )
              })
            }
          </SelectField>
          <SelectField
            value={this.props.values.state}
            onChange={this._onChange('state')}
            errorText={this._errorText('state_valid', 'required')}
            autoWidth={true}
            style={styles.SELECT}
            floatingLabelText='Estado'>
            {
              this.props.states.map((state, index) => {
                return (
                  <MenuItem key={index} value={state.id} primaryText={state.value} />
                )
              })
            }
          </SelectField>
          <SelectField
            value={this.props.values.city}
            errorText={this._errorText('city_valid', 'required')}
            onChange={this._onChange('city')}
            autoWidth={true}
            style={styles.SELECT}
            floatingLabelText='Ciudad'>
            {
              this.props.cities.map((city, index) => {
                return (
                  <MenuItem key={index} value={city.id} primaryText={city.value} />
                )
              })
            }
          </SelectField>
          <TextField
            floatingLabelText='Localidad'
            style={styles.TEXT_LARGE}
            valueLink={this.getReferenceFor('locality')}
          />
          <TextField
            floatingLabelText='Calle'
            errorText={this._errorText('street_valid', 'required')}
            style={styles.TEXT_LARGE}
            valueLink={this.getReferenceFor('street')}
          />
          <TextField
            floatingLabelText='Número'
            style={styles.TEXT_X_SMALL}
            valueLink={this.getReferenceFor('number')}
          />
          <TextField
            floatingLabelText='Colonia'
            style={styles.TEXT_MEDIUM}
            valueLink={this.getReferenceFor('suburb')}
          />
          <TextField
            floatingLabelText='C.P.'
            style={styles.TEXT_X_SMALL}
            valueLink={this.getReferenceFor('zipCode')}
          />
          <TextField
            floatingLabelText='Email de facturación'
            style={styles.TEXT_MEDIUM}
            valueLink={this.getReferenceFor('companyEmail')}
            errorText={this._errorText('companyEmail_valid', 'emailFormat')}
          />
          <TextField
            floatingLabelText='Teléfono de la empresa'
            style={styles.TEXT_SMALL}
            valueLink={this.getReferenceFor('companyPhone')}
            errorText={this._errorText('companyPhone_valid', 'required')}
          />
        </div>
      </div>
    )
  }
})

export default General
