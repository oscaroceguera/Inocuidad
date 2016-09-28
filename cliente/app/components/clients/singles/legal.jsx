import React from 'react'
import TextField from 'material-ui/lib/text-field'
import * as styles from '../../commons/styles'
import Avatar from '../../commons/generic-avatar.jsx'
import { Styles } from 'material-ui'

const Legal = React.createClass({
  getReferenceFor (name) {
    return this.props.valueLinks[name]
  },

  _errorText (validItem, requiredType) {
    return this.props.errorText(validItem, requiredType)
  },

  render () {
    return (
      <div>
        <Avatar
          icon='mdi mdi-tie'
          backgroundColor={Styles.Colors.orange500}
          title='Representante legal'
        />
        <TextField
          floatingLabelText='Nombre completo'
          style={styles.TEXT_LARGE}
          valueLink={this.getReferenceFor('legalName')}
          errorText={this._errorText('legalName_valid', 'required')}
        />
        <TextField
          floatingLabelText='Teléfono'
          style={styles.TEXT_SMALL}
          valueLink={this.getReferenceFor('legalPhone')}
          errorText={this._errorText('legalPhone_valid', 'required')}
        />
        <TextField
          floatingLabelText='Email'
          style={styles.TEXT_MEDIUM}
          valueLink={this.getReferenceFor('legalEmail')}
          errorText={this._errorText('legalEmail_valid', 'emailFormat')}
        />
      </div>
    )
  }
})

export default Legal
