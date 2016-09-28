import React from 'react'
import _ from 'lodash'
import List from 'material-ui/lib/lists/list'
import Divider from 'material-ui/lib/divider'
import { Styles } from 'material-ui'
import * as styles from '../commons/styles'

import ListItem from './list-item.jsx'

const DSBLE = true

let ListView = React.createClass({

  render () {
    let client = this.props.client
    let location = `${_.capitalize(this.props.city)}, ${_.capitalize(this.props.state)}, ${_.capitalize(this.props.country)}`

    return (
      <List>
        <ListItem
          disabled={DSBLE}
          icon='mdi mdi-map-marker'
          style={{color: `${Styles.Colors.indigo500}`}}
          primary={location}
          secondary='Ubicación'
        />
        <ListItem
          disabled={DSBLE}
          icon='mdi mdi-phone'
          style={{color: `${Styles.Colors.lightBlue500}`}}
          primary={client.companyPhone}
          secondary='Teléfono de la empresa'
        />
        <ListItem
          disabled={DSBLE}
          icon='mdi mdi-at'
          style={{color: `${Styles.Colors.red500}`}}
          primary={client.companyEmail}
          secondary='Email de la empresa'
        />
        <Divider />
        <ListItem
          styleLegal={styles.CARD_LIST_ITEM}
          disabled={DSBLE}
          icon='mdi mdi-account'
          style={{color: `${Styles.Colors.teal500}`}}
          primary={client.legalName}
          secondary='Representante legal'
        />
      </List>
    )
  }
})

export default ListView
