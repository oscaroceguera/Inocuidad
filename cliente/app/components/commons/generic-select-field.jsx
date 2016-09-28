import React from 'react'
import { SelectField, MenuItem } from 'material-ui'
import * as aux from './aux-functions'
import * as styles from './styles'

const GenericSelectField = React.createClass({
  render () {
    let {validField, requiredType, menuItem} = this.props
    let width = true
    return (
      <SelectField
        {...this.props}
        autoWidth={width}
        style={styles.SELECT}
        errorText={aux.errorTextSelect(validField, requiredType)}
      >
        {
          menuItem.map((item, index) => {
            return (
              <MenuItem
                key={index}
                value={item.id}
                primaryText={item.value}
              />
            )
          })
        }
      </SelectField>
    )
  }
})

export default GenericSelectField
