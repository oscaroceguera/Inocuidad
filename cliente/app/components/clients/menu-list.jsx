import React from 'react'
import ListItem from 'material-ui/lib/lists/list-item'
import FontIcon from 'material-ui/lib/font-icon'

const MenuList = React.createClass({

  render () {
    let {...other} = this.props

    return (
      <ListItem
        {...other}
        title={this.props.title}
        leftIcon={
          <FontIcon
            className={this.props.icon}
            style={this.props.iconStyl}
          />
        }
        onClick={this.props.onClick}
      />
    )
  }

});

export default MenuList
