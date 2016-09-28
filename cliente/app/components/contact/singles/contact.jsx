import React from 'react'
import TextField from 'material-ui/lib/text-field'
import * as styles from '../../commons/styles'
import Avatar from '../../commons/generic-avatar.jsx'
import { Styles } from 'material-ui'

const Contact = React.createClass({
  getReferenceFor (name) {
    return this.props.valueLinks[name]
  },

  _errorText (section, validItem, requiredType) {
    return this.props.errorText(section, validItem, requiredType)
  },

  render () {
    return (
      <div>
        <Avatar
          icon='mdi mdi-email'
          backgroundColor={Styles.Colors.orange500}
          title='Información de contacto'
        />
        <TextField
          floatingLabelText='Nombre completo del contacto'
          style={styles.TEXT_LARGE}
          valueLink={this.getReferenceFor('contactName')}
          errorText={this._errorText('validates', 'contactName_valid', 'required')}
        />
        <TextField
          floatingLabelText='Teléfono del contacto'
          style={styles.TEXT_SMALL}
          valueLink={this.getReferenceFor('contactPhone')}
          errorText={this._errorText('validates', 'contactPhone_valid', 'required')}
        />
        <TextField
          floatingLabelText='Email del contacto'
          style={styles.TEXT_MEDIUM}
          valueLink={this.getReferenceFor('contactEmail')}
          errorText={this._errorText('validates', 'contactEmail_valid', 'emailFormat')}
        />
        <TextField
          floatingLabelText='Puesto del contacto'
          style={styles.TEXT_LARGE}
          valueLink={this.getReferenceFor('contactPosition')}
          errorText={this._errorText('validates', 'contactPosition_valid', 'required')}
        />
      </div>
    )
  }
})

export default Contact
