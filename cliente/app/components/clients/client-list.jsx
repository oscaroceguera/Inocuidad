import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchClients } from '../../actions/clients'
import { fetchCatalogs } from '../../actions/catalogs'
import { browserHistory, Link } from 'react-router'
import SubmenuBar from '../commons/submenu-bar.jsx'
import * as styles from '../commons/styles'

import Card from 'material-ui/lib/card/card'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import CardHeader from 'material-ui/lib/card/card-header'
import FontIcon from 'material-ui/lib/font-icon'
import { Styles } from 'material-ui'

import ListView from './list.jsx'

const BAR_MENU = {
  title: 'Clientes',
  avatar: 'mdi mdi-account-switch',
  path: '/'
}

const FLOAT_BUTTON = {
  bottom: '2rem',
  position: 'fixed',
  right: '2rem',
  zIndex: '1'
}

const CATEGORIES = {
  '98e1651e-9715-4095-9cf5-0c03d9b8513e': {
    color: Styles.Colors.green500,
    icon: 'mdi mdi-leaf'
  },
  '587a0496-82d0-4f27-a27f-ce22f60e3a3c': {
    color: Styles.Colors.green500,
    icon: 'mdi mdi-fish'
  },
  'b90d7685-d3e4-494e-809e-d28fa66e933f': {
    color: Styles.Colors.deepPurple500,
    icon: 'mdi mdi-truck'
  },
  'b0690643-ccd3-496d-8e73-923ead157cb0': {
    color: Styles.Colors.green500,
    icon: 'mdi mdi-food-variant'
  },
  '8f214196-c85f-4182-ad07-4f31420a51d0': {
    color: Styles.Colors.tealA700,
    icon: 'mdi mdi-flask-outline'
  }
}

let ClientList = React.createClass({

  componentWillMount () {
    this.props.fetchClients()
    this.props.fetchCatalogs()
  },

  _goDetail (id) {
    return (e) => {
      e.stopPropagation()
      browserHistory.push(`client-detail/${id}`)
    }
  },

  _locationInfo (client) {
    if (!client) {
      return
    }

    let catalogValue = _.filter(this.props.catalogs, (item) => {
      return item.id === client
    })

    let value = _.map(catalogValue, (x) => x.value)

    return value
  },

  render () {
    return (
      <div>
        <SubmenuBar {...BAR_MENU}/>
        <div style={styles.CARD_CONTAINER}>
        {
          this.props.clients.map((client, index) => {
            let avatar = CATEGORIES[client.category]
            return (
              <Card
                className='Card'
                key={index}
                style={styles.CARD}
                onClick={this._goDetail(client.uuid)}
              >
                <CardHeader
                  title={client.companyName}
                  subtitle={client.rfc}
                  avatar={
                    <FontIcon
                      className={avatar.icon}
                      style={{color: `${avatar.color}`}}
                    />
                  }
                />
                <ListView
                  client={client}
                  country={this._locationInfo(client.country)}
                  state={this._locationInfo(client.state)}
                  city={this._locationInfo(client.city)}
                />
              </Card>
            )
          })
        }
          <Link to='clients-new'>
            <FloatingActionButton style={FLOAT_BUTTON}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>
        </div>
      </div>
    )
  }
})

function mapStateToProps (state) {
  return {
    clients: state.clientData.all,
    catalogs: state.catalogsStore.all
  }
}

export default connect(mapStateToProps, {
  fetchClients,
  fetchCatalogs
})(ClientList)
