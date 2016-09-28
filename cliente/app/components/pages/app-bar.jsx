import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Avatar from 'material-ui/lib/avatar'
import { Styles } from 'material-ui'
import * as actions from '../../actions/auth'
import UserOption from './user-option.jsx'

const FLEX = {
  display: 'flex'
}

const FLEX_ALIGN_CENTER = {
  ...FLEX,
  alignItems: 'center'
}

const styles = {
  LINK: {
    textDecoration: 'none',
    cursor: 'pointer'
  },
  BAR_STYLES: {
    ...FLEX_ALIGN_CENTER,
    background: Styles.Colors.green500,
    justifyContent: 'space-between',
    padding: '.5em'
  },
  AVATAR_TITLE_CONTAINER: {
    ...FLEX,
    marginBottom: '.2em'
  },
  TITLE: {
    color: 'white',
    fontSize: '1.5em',
    marginLeft: '.2em'
  },
  ICON_MENU_CONTAINER: {
    ...FLEX_ALIGN_CENTER
  },
  USER_NAME: {
    color: 'white',
    fontSize: '.8em'
  },
  ICON_BTN_STYLE: {
    color: 'white',
    fontSize: '32px'
  }
}

const AppBar = React.createClass({
  componentWillMount () {
    if (this.props.authenticated) {
      this.props.currentSession()
    }
  },

  render () {
    let isAuthenticated = this.props.authenticated
    let _userOption = ''

    if (isAuthenticated) {
      if (!this.props.session) {
        _userOption = ''
      } else {
        _userOption = <UserOption {...styles} user={this.props.session}/>
      }
    }

    return (
      <div style={styles.BAR_STYLES}>
        <Link to='/' style={styles.LINK}>
          <div style={styles.AVATAR_TITLE_CONTAINER}>
            <div style={styles.AVATAR}>
              <Avatar size={32} className='logo'/>
            </div>
            <div style={styles.TITLE}>
              <label>Tecsiapp</label>
            </div>
          </div>
        </Link>
        {_userOption}
      </div>
    )
  }
})

function mapStateToProps (state) {
  return {
    authenticated: state.auth.authenticated,
    session: state.auth.session
  }
}

export default connect(mapStateToProps, actions)(AppBar)
