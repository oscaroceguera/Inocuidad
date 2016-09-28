import React from 'react'
import {DatePicker} from 'material-ui'
import TextField from 'material-ui/lib/text-field'
import * as styles from '../../commons/styles'

const Comment = React.createClass({
  getReferenceFor (name) {
    return this.props.valueLinks[name]
  },

  render () {
    return (
      <div>
        <DatePicker
          textFieldStyle={styles.TEXT_SMALL}
          hintText='Agendar cita'
          valueLink={this.getReferenceFor('appointment')}
        />
        <TextField
          hintText='Agrega un comentario'
          floatingLabelText='Comentarios:'
          style={styles.TEXT_LARGE}
          multiLine={true}
          valueLink={this.getReferenceFor('comentaries')}
        />
      </div>
    )
  }
})

export default Comment
