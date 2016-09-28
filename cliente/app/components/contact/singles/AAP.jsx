import React from 'react'
import TextField from 'material-ui/lib/text-field'
import * as styles from '../../commons/styles'
import Avatar from '../../commons/generic-avatar.jsx'
import { Styles } from 'material-ui'

import {CATEGORIES} from '../../commons/categories'

const AAP = React.createClass({
  getReferenceFor (name) {
    return this.props.valueLinks[name]
  },

  _errorText (section, validItem, requiredType) {
    return this.props.errorText(section, validItem, requiredType)
  },

  render () {
    let mdiIcon = ''
    let title = this.props.title
    title = CATEGORIES[title]

    if (title === 'Agrícola') {
      mdiIcon = 'mdi mdi-leaf'
    } else if (title === 'Acuícola') {
      mdiIcon = 'mdi mdi-fish'
    } else if (title === 'Procesadora') {
      mdiIcon = 'mdi mdi-food-variant'
    }

    return (
      <div>
        <Avatar
          icon={mdiIcon}
          backgroundColor={Styles.Colors.green500}
          title={title}
        />
        <TextField
          floatingLabelText='Hectáreas de producción ó estanques'
          style={styles.TEXT_LARGE}
          valueLink={this.getReferenceFor('aapAmonunt')}
          errorText={this._errorText('validateAap', 'aapAmonunt_valid', 'required')}
        />
        <TextField
          floatingLabelText='Productos ó especies producen/frabrican'
          style={styles.TEXT_LARGE}
          valueLink={this.getReferenceFor('aapProduct')}
          errorText={this._errorText('validateAap', 'aapProduct_valid', 'required')}
        />
        <TextField
          floatingLabelText='¿Lleva a cabo proceso de empacado?'
          style={styles.TEXT_LARGE}
          valueLink={this.getReferenceFor('aapPacked')}
          errorText={this._errorText('validateAap', 'aapPacked_valid', 'required')}
        />
        <TextField
          type='number'
          floatingLabelText='Nº albergues'
          style={styles.TEXT_X_SMALL}
          valueLink={this.getReferenceFor('aapNumberShelters')}
          errorText={this._errorText('validateAap', 'aapNumberShelters_valid', 'numberCount')}
        />
      </div>
    )
  }
})

export default AAP
