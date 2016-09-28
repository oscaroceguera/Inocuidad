import React from 'react'
import ListItem from 'material-ui/lib/lists/list-item'
import FontIcon from 'material-ui/lib/font-icon'

let ListItemView = React.createClass({
  render () {
    let { disabled, icon, style, primary, secondary } = this.props
    let styleLegal = {...this.props.styleLegal}

    return (
      <ListItem
        style={styleLegal}
        disabled={disabled}
        leftIcon={
          <FontIcon
            className={icon}
            style={style}
          />
        }
        primaryText={primary}
        secondaryText={secondary}
      />
    )
  }
})

export default ListItemView
