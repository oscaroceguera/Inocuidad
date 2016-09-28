import React from 'react'
import TextField from 'material-ui/lib/text-field'
import * as styles from '../../commons/styles'
import Avatar from '../../commons/generic-avatar.jsx'
import { Styles } from 'material-ui'

const Laboratory = React.createClass({
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
          icon='mdi mdi-flask-outline'
          backgroundColor={Styles.Colors.tealA700}
          title='Laboratorio'
        />
        <TextField
          floatingLabelText='Giro del laboratorio'
          style={styles.TEXT_LARGE}
          valueLink={this.getReferenceFor('labCategory')}
          errorText={this._errorText('validateLab', 'labCategory_valid', 'required')}
        />
        <TextField
          floatingLabelText='Normativa a acreditarse'
          style={styles.TEXT_LARGE}
          valueLink={this.getReferenceFor('labNom')}
        />
        <TextField
          floatingLabelText='Ensayos a acreditarse'
          style={styles.TEXT_LARGE}
          valueLink={this.getReferenceFor('labTest')}
        />
      </div>
    )
  }
})

export default Laboratory
