import React from 'react'

import Paper from 'material-ui/lib/paper'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import Avatar from 'material-ui/lib/avatar'

import * as styles from '../commons/styles'
import * as aux from '../commons/aux-functions'

const TRUE = true

const ForgotPassword = React.createClass({
  getInitialState () {
    return {
      userEmail: null,
      userEmail_valid: false,
      showSubmit: true
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
                backgroundColor={styles.PURPLE_A700}
              />
            </div>
            <div>
              <TextField
                hintText='Username'
                value={this.state.userEmail}
              />
            </div>
          </div>
          <div style={styles.MARGIN_ROW}>
            <RaisedButton
              label='Recuperar contraseña'
              secondary={TRUE}
              disabled={this.state.showSubmit}
            />
          </div>
        </Paper>
      </div>
    )
  }
})

export default ForgotPassword
