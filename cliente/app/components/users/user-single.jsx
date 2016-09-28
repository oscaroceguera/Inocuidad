import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
// Actions
import {fetchUser, updateUser, createUser, emptyUser} from '../../actions/users'
import { fetchModules } from '../../actions/modules'
// Material ui
import Checkbox from 'material-ui/lib/checkbox'
import Snackbar from 'material-ui/lib/snackbar'
import RaisedButton from 'material-ui/lib/raised-button'
// Commons & components
import GenericTextField from '../commons/generic-text-field.jsx'
import SubmenuBar from '../commons/submenu-bar.jsx'
import * as styles from '../commons/styles'
import * as aux from '../commons/aux-functions'
import {model} from './model'

const BAR_MENU = {
  title: 'Crear usuario',
  avatar: 'mdi mdi-account-multiple',
  path: '/users'
}

const UserSingle = React.createClass({

  getInitialState () {
    let state = model(this.props)
    return state
  },

  componentWillMount () {
    this.props.fetchModules()

    let userId = this.props.userId

    if (userId) {
      this.props.fetchUser(this.props.userId)
    }
  },

  componentWillUnmount () {
    this.props.emptyUser()
  },

  componentWillReceiveProps (nextProps) {
    if (!nextProps.userId) {
      return
    }

    if (nextProps.user) {
      let obj = model(nextProps.user)
      this.setState(obj)
    }
  },

  inputLinkValue (key) {
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
    let valueLink = this.inputLinkValue(value)
    let validField = `${value}_valid`
    return (e) => {
      let obj = aux.validateValueLinkText(valueLink, validField, validType, this.state.validates)
      this.setState(obj)
    }
  },

  onKeyDownPassword (field, validField, fieldCompare, validFieldCompare) {
    return (e) => {
      this._onValidatePassword(field, validField, fieldCompare, validFieldCompare)
    }
  },

  _onValidatePassword (field, validField, fieldCompare, validFieldCompare) {
    let compare = this.state.fields[fieldCompare]
    let value = this.state.fields[field]
    let obj = this.state.validates
    let type = false
    let typeCompare = false

    if (compare === value) {
      type = true
      typeCompare = true
    } else {
      type = false
      typeCompare = false
    }

    obj[validField] = type
    obj[validFieldCompare] = type

    this.setState(obj)
  },

  _bindItem (item) {
    return (e, checked) => {
      this._onChangeCheckbox(item, checked)
    }
  },

  _onChangeCheckbox (item, checked) {
    let selection = this.state.modules
    let checkbox = this.refs[item.acronym]

    selection = _.reject(selection, (data) => {
      return item.acronym === data
    })

    if (checked) {
      selection.push(item.acronym)
    }

    checkbox.setChecked(this._isChecked(item, selection))

    this.setState({
      modules: selection
    })
  },

  _isChecked (item, selection = this.state.modules) {
    return _.includes(selection, item.acronym)
  },

  onSave () {
    let userId = this.state.fields.userId

    if (userId) {
      return this.props.updateUser(userId, this.state)
    }
    this.props.createUser(this.state)
  },

  handleRequestCLose () {
    this.setState({
      open: false
    })
  },

  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <Snackbar
          ref='snackbar'
          open={this.state.open}
          message={this.props.errorMessage}
          autoHideDuration={4000}
          action='aceptar'
          onActionTouchTap={this.handleRequestCLose}
          onRequestClose={this.handleRequestCLose}
        />
      )
    }
  },

  render () {
    // state for validates
    let {
      name_valid,
      firstSurname_valid,
      secondSurname_valid,
      email_valid,
      pass_valid,
      passConfirm_valid
    } = this.state.validates

    // all state.validates are true & modules.length > 0
    let showSubmit = this.state.showSubmit
    let lengthValid = aux.showSubmit(this.state.validates, this.state.fields)
    let lengthModules = this.state.modules.length > 0

    lengthValid && lengthModules ? showSubmit = true : showSubmit = false

    return (
      <div>
        <SubmenuBar {...BAR_MENU} btnSave={true}/>
        <div style={styles.FORM}>
          <div style={{display: (this.state.fields.userId ? 'block' : 'none')}}>
            <GenericTextField
              disabled={true}
              floatingLabelText='User ID'
              style={styles.TEXT_LARGE}
              valueLink={this.inputLinkValue('userId')}
            />
          </div>
          <GenericTextField
            floatingLabelText='Nombre (s)'
            errorText={name_valid}
            requiredType='required'
            style={styles.TEXT_MEDIUM}
            valueLink={this.inputLinkValue('name')}
            onBlur={this.onKeyDownText('name', 'text')}
          />
          <GenericTextField
            floatingLabelText='Apellido paterno'
            errorText={firstSurname_valid}
            requiredType='required'
            style={styles.TEXT_MEDIUM}
            valueLink={this.inputLinkValue('firstSurname')}
            onBlur={this.onKeyDownText('firstSurname', 'text')}
          />
          <GenericTextField
            floatingLabelText='Apellido materno'
            errorText={secondSurname_valid}
            requiredType='required'
            style={styles.TEXT_MEDIUM}
            valueLink={this.inputLinkValue('secondSurname')}
            onBlur={this.onKeyDownText('secondSurname', 'text')}
          />
          <GenericTextField
            floatingLabelText='Email'
            errorText={email_valid}
            requiredType='emailFormat'
            style={styles.TEXT_MEDIUM}
            valueLink={this.inputLinkValue('email')}
            onKeyDown={this.onKeyDownText('email', 'email')}
          />
          <div style={{display: (this.state.fields.userId ? 'none' : 'block')}}>
            <GenericTextField
              floatingLabelText='Password'
              style={styles.TEXT_MEDIUM}
              errorText={pass_valid}
              requiredType='isPassEqual'
              valueLink={this.inputLinkValue('pass')}
              type='password'
              onBlur={
                this.onKeyDownPassword('pass', 'pass_valid', 'passConfirm', 'passConfirm_valid')
              }
            />
            <GenericTextField
              floatingLabelText='Confirmar password'
              style={styles.TEXT_MEDIUM}
              errorText={passConfirm_valid}
              requiredType='isPassEqual'
              valueLink={this.inputLinkValue('passConfirm')}
              type='password'
              onBlur={
                this.onKeyDownPassword('passConfirm', 'passConfirm_valid', 'pass', 'pass_valid')
              }
            />
          </div>
          <div style={styles.CHECK_CONTAINER}>
            {
              _.map(this.props.modulesStore, (item) => {
                return (
                  <Checkbox
                    key={item.acronym}
                    style={styles.CHECKBOX}
                    label={item.subtitle}
                    ref={item.acronym}
                    onCheck={this._bindItem(item)}
                    defaultChecked={this._isChecked(item)}
                  />
                )
              })
            }
          </div>
        </div>
        <div className='save__btn'>
          <RaisedButton
            label='Guardar'
            primary={true}
            onMouseDown={this.onSave}
            disabled={showSubmit ? false : true}
          />
        </div>
        {this.renderAlert()}
      </div>
    )
  }
})

function mapStateToProps (state, props) {
  return {
    modulesStore: state.modulesStore.all,
    errorMessage: state.userData.error,
    userId: props.params.userId,
    user: state.userData.user
  }
}

// actions : createUser, fetchUser, updateUser...
export default connect(
  mapStateToProps, {
    fetchUser,
    updateUser,
    createUser,
    fetchModules,
    emptyUser
  })(UserSingle)
