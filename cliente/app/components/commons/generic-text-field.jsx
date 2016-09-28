import React from 'react'
import TextField from 'material-ui/lib/text-field'
import * as aux from './aux-functions'

const GenericTextField = React.createClass({
  render () {
    let {errorText, requiredType} = this.props

    return (
      <TextField
        {...this.props}
        errorText={errorText ? null : aux.errorText(requiredType)}
      />
    )
  }
})

export default GenericTextField
