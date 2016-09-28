import React from 'react'
import {Avatar, FontIcon} from 'material-ui'

const AVATAR_CONTAINER = {
  display: 'flex',
  alignItems: 'center',
  marginLeft: '0.5em'
}

const MARGIN_TEXT = {
  marginLeft: '.5em'
}

const GenericAvatar = React.createClass({
  render () {
    return (
      <div style={AVATAR_CONTAINER}>
        <Avatar
          backgroundColor={this.props.backgroundColor}
          icon={<FontIcon className={this.props.icon} />}
        />
        <h4 style={MARGIN_TEXT}>
          {this.props.title}
        </h4>
      </div>
    )
  }
})

export default GenericAvatar
