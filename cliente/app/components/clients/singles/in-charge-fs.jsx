import React from 'react'
import TextField from 'material-ui/lib/text-field'
import * as styles from '../../commons/styles'
import Avatar from '../../commons/generic-avatar.jsx'
import { Styles } from 'material-ui'

const InChargeFS = React.createClass({
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
          icon='mdi mdi-auto-fix'
          backgroundColor={Styles.Colors.green500}
          title='Responsable de inocuidad'
        />
        <TextField
          floatingLabelText='Nombre completo'
          style={styles.TEXT_LARGE}
          valueLink={this.getReferenceFor('inChargeFSName')}
          errorText={this._errorText('inChargeFSName_valid', 'required')}
        />
        <TextField
          floatingLabelText='Teléfono'
          style={styles.TEXT_SMALL}
          valueLink={this.getReferenceFor('inChargeFSPhone')}
          errorText={this._errorText('inChargeFSPhone_valid', 'required')}
        />
        <TextField
          floatingLabelText='Email'
          style={styles.TEXT_MEDIUM}
          valueLink={this.getReferenceFor('inChargeFSEmail')}
          errorText={this._errorText('inChargeFSEmail_valid', 'emailFormat')}
        />
      </div>
    )
  }
})

export default InChargeFS
