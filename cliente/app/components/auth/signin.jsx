import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { signinUser } from '../../actions/auth'
import Paper from 'material-ui/lib/paper'
import Avatar from 'material-ui/lib/avatar'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import Snackbar from 'material-ui/lib/snackbar'
import { browserHistory } from 'react-router'
import * as styles from '../commons/styles'

const TRUE = true

const Signin = React.createClass({

  getInitialState () {
    return {
      email: 'oscar@email.com',
      password: 'lorem',
      open: true
    }
  },

  componentWillMount () {
    if (this.props.authenticated) {
      browserHistory.push('/panel')
    }
  },

  componentWillUpdate (nextProps) {
    if (nextProps.authenticated) {
      browserHistory.push('/panel')
    }
  },

  signin () {
    let email = this.state.email
    let password = this.state.password
    this.props.signinUser({email, password})
  },

  inputLinkValue (property) {
    return {
      value: this.state[property],
      requestChange: (value) => {
        let obj = {}
        obj[property] = value
        this.setState(obj)
      }
    }
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
    return (
      <div>
        <Paper style={styles.PAPER_CONTAINER}>
          <div style={styles.PAPER_ROW_FIELD}>
            <div style={styles.PAPER_ITEM}>
              <Avatar size={32}
                className='mdi mdi-account'
                color='white'
                backgroundColor={styles.PURPLE_A700}/>
            </div>
            <div>
              <TextField
                hintText='Username'
                valueLink={this.inputLinkValue('email')}
              />
            </div>
          </div>

          <div style={styles.PAPER_ROW_FIELD}>
            <div style={styles.PAPER_ITEM}>
              <Avatar size={32}
                className='mdi mdi-key-variant'
                color='white'
                backgroundColor={styles.PURPLE_A700}/>
            </div>
            <div>
              <TextField
                hintText='Password'
                type='password'
                valueLink={this.inputLinkValue('password')}
              />
            </div>
          </div>

          <div style={styles.MARGIN_ROW}>
            <RaisedButton
              label='Sign in'
              secondary={TRUE}
              onClick={this.signin}
            />
          </div>
        </Paper>
        <div style={styles.FORGOT_PASS_LINK_CONTAINER}>
          <Link
            style={styles.FORGOT_PASS_LINK_COLOR}
            to='/forgot-password'
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        {this.renderAlert()}
      </div>
    )
  }
})

function mapStateToProps (state) {
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, {signinUser})(Signin)
