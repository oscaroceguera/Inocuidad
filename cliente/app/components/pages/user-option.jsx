import React from 'react'
import { connect } from 'react-redux'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import IconButton from 'material-ui/lib/icon-button'
import MenuItem from 'material-ui/lib/menus/menu-item'
import * as actions from '../../actions/auth'

const UserOption = React.createClass({
  onMenuItemTouchTapped (event, item) {
    let itemValue = item.props.value
    if (itemValue === 'logout') {
      this.props.signoutUser()
    }
  },

  _showOptions (props) {
    const {
      ICON_MENU_CONTAINER,
      USER_NAME,
      ICON_BTN_STYLE,
      user
    } = props

    return (
      <div style={ICON_MENU_CONTAINER}>
        <div>
          <label style={USER_NAME}>{user.email}</label>
        </div>
        <IconMenu
          iconButtonElement={
            <IconButton iconStyle={ICON_BTN_STYLE} iconClassName='mdi mdi-account-circle' />
          }
          onItemTouchTap={this.onMenuItemTouchTapped}
        >
          <MenuItem value='logout' primaryText='Salir' />
          <MenuItem value='changePass' primaryText='Cambiar password' />
        </IconMenu>
      </div>
    )
  },

  render () {
    return (
      <div style={this.props.ICON_MENU_CONTAINER}>
        {this._showOptions(this.props)}
      </div>
      )
  }
})

export default connect(null, actions)(UserOption)
