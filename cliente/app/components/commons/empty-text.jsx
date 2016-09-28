import React from 'react'

const NO_ITEMS_FOUND = {
  width: '100%',
  textAlign: 'center',
  fontSize: '18px',
  color: '#8A8A8A'
}

let EmptyText = React.createClass({

  getDefaultProps () {
    return {
      text: 'No se encontraron elementos'
    }
  },

  render () {
    let style = {
      ...NO_ITEMS_FOUND,
      ...this.props.style
    }
    return <div style={style}>{this.props.text}</div>
  }
})

export default EmptyText
