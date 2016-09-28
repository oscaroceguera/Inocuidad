import React from 'react'
import {
  RadioButton,
  RadioButtonGroup
} from 'material-ui'
import * as styles from '../../commons/styles'

const Category = React.createClass({
  _onLegalTypeChange (e, newCategory) {
    this.props.onChange(newCategory, 'category')
  },

  render () {
    return (
      <div>
        <h3 style={{marginLeft: '0.5em'}}>Giro de la empresa</h3>
        <RadioButtonGroup
          name='categories'
          valueSelected={this.props.values.category}
          onChange={this._onLegalTypeChange}
          style={styles.RADIO_BUTTON_GROUP}
        >
          {
            this.props.categories.map((category, index) => {
              return (
                <RadioButton
                  key={index}
                  value={category.id}
                  label={category.value}
                  style={styles.RADIO_BUTTON}
                />
              )
            })
          }
        </RadioButtonGroup>
      </div>
    )
  }
})

export default Category
