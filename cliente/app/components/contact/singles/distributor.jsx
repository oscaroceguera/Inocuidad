import React from 'react'
import TextField from 'material-ui/lib/text-field'
import * as styles from '../../commons/styles'
import Avatar from '../../commons/generic-avatar.jsx'
import { Styles } from 'material-ui'

const Distributor = React.createClass({
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
          icon='mdi mdi-truck'
          backgroundColor={Styles.Colors.deepPurple500}
          title='Distribuidora'
        />
        <TextField
          type='number'
          floatingLabelText='Nº almacenes'
          style={styles.TEXT_X_SMALL}
          valueLink={this.getReferenceFor('distNumberStores')}
          errorText={this._errorText('validateDist', 'distNumberStores_valid', 'numberCount')}
        /><br />
        <TextField
          floatingLabelText='¿Que productos comercializa?'
          style={styles.TEXT_LARGE}
          multiLine={true}
          valueLink={this.getReferenceFor('distProducts')}
          errorText={this._errorText('validateDist', 'distProducts_valid', 'required')}
        />
      </div>
    )
  }
})

export default Distributor
