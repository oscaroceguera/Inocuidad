import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Avatar from 'material-ui/lib/avatar'
import IconButton from 'material-ui/lib/icon-button'
import { Styles } from 'material-ui'

const styles = {
  BAR_CONTAINER: {
    alignItems: 'center',
    background: Styles.Colors.grey300,
    color: Styles.Colors.grey500,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 0.5em'
  },
  TITLE_CONTAINER: {
    alignItems: 'center',
    display: 'flex'
  },
  AVATAR: {
    background: Styles.Colors.blue500
  },
  TITLE: {
    fontSize: '1.5em',
    fontWeight: 'normal',
    margin: 0,
    padding: '0.5em'
  },
  BACK: {
    color: Styles.Colors.grey500
  }
}

class SubmenuBar extends Component {
  render () {
    let { avatar, title, path } = this.props

    return (
      <div style={styles.BAR_CONTAINER}>
        <div style={styles.TITLE_CONTAINER}>
          <Avatar
            size={32}
            className={avatar}
            style={styles.AVATAR}
          />
          <h1 style={styles.TITLE}>{title}</h1>
        </div>
        <Link to={path}>
          <IconButton
            iconClassName='mdi mdi-keyboard-return'
            iconStyle={styles.BACK}
          />
        </Link>
      </div>
    )
  }
}

SubmenuBar.propTypes = {
  avatar: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
}

export default SubmenuBar
