import React from 'react'
import TextField from 'material-ui/lib/text-field'
import {
  Checkbox
} from 'material-ui'
import _ from 'lodash'
import * as styles from '../../commons/styles'
import Avatar from '../../commons/generic-avatar.jsx'
import { Styles } from 'material-ui'

const Service = React.createClass({
  getReferenceFor (name) {
    return this.props.valueLinks[name]
  },

  _bindItem (item) {
    return (e, checked) => {
      this._onChangeCheckbox(item, checked)
    }
  },

  _onChangeCheckbox (item, checked) {
    let selection = this.props.values.services
    let checkbox = this.refs[item.value]

    selection = _.reject(selection, (data) => {
      return item.value === data
    })

    if (checked) {
      selection.push(item.value)
    }

    checkbox.setChecked(this._isChecked(item, selection))

    this.props.onCheckService(selection, 'services')
  },

  _isChecked (item, selection = this.props.values.services) {
    return _.includes(selection, item.value)
  },

  _errorText (section, validItem, requiredType) {
    return this.props.errorText(section, validItem, requiredType)
  },

  _trainingOptions () {
    let services = this.props.values.services
    let trainingOptions = _.includes(services, 'CAPACITACIÓN')

    if (trainingOptions === true) {
      return (
        <div>
          <TextField
            floatingLabelText='Temas de capacitación'
            style={styles.TEXT_LARGE}
            valueLink={this.getReferenceFor('trainingTopic')}
            errorText={this._errorText('validateTraining', 'trainingTopic_valid', 'required')}
          />
          <TextField
            type='number'
            floatingLabelText='Nº personas'
            style={styles.TEXT_X_SMALL}
            valueLink={this.getReferenceFor('numberPeople')}
            errorText={this._errorText('validateTraining', 'numberPeople_valid', 'numberCount')}
          />
          <TextField
            floatingLabelText='Nivel jerárquico'
            style={styles.TEXT_MEDIUM}
            valueLink={this.getReferenceFor('hierarchicalLevel')}
            errorText={this._errorText('validateTraining', 'hierarchicalLevel_valid', 'required')}
          />
        </div>
      )
    }
  },

  render () {
    let trainingOptions = this._trainingOptions()

    return (
      <div>
        <Avatar
          icon='mdi mdi-barcode'
          backgroundColor={Styles.Colors.blue500}
          title='Servicio requerido'
        />
        <div style={styles.CHECK_CONTAINER}>
          {
            this.props.services.map((service, index) => {
              return (
                <Checkbox
                  key={index}
                  label={service.value}
                  ref={service.value}
                  onCheck={this._bindItem(service)}
                  defaultChecked={this._isChecked(service)}
                  style={styles.CHECKBOX}
                />
              )
            })
          }
        </div>
        <TextField
          floatingLabelText='Esquema requerido'
          style={styles.TEXT_LARGE}
          valueLink={this.getReferenceFor('schema')}
        />
        <TextField
          floatingLabelText='¿Tiene certificaciones en inocuidad?'
          style={styles.TEXT_LARGE}
          valueLink={this.getReferenceFor('certification')}
        />
        {trainingOptions}
      </div>
    )
  }
})

export default Service
