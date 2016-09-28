import React from 'react'
import { connect } from 'react-redux'
import {fetchCatalogs} from '../../actions/catalogs'
import {browserHistory} from 'react-router'
import _ from 'lodash'

export let ListWrapperClient = (ComposedComponent, linkNew, linkUpdate) => {
  const list = React.createClass({

    componentWillMount () {
      this.props.fetchCatalogs()
    },

    _catalogValue (type) {
      let catalogValue = _.filter(this.props.catalogs, (item) => {
        return item.id === type
      })

      let value = _.map(catalogValue, (x) => x.value)

      return value
    },

    _formatCountry (column) {
      return this._catalogValue(column.country)
    },

    _formatState (column) {
      return this._catalogValue(column.state)
    },

    _formatCity (column) {
      return this._catalogValue(column.city)
    },

    _columnHeader (items) {
      _.map(items, (item) => {
        if (item.key === 'country') { item.format = this._formatCountry }
        if (item.key === 'state') { item.format = this._formatState }
        if (item.key === 'city') { item.format = this._formatCity }
        return item
      })
      return items
    },

    _goDetail (item) {
      let clientId = item.clientUuid
      let uuid = item.uuid
      return browserHistory.push(`/client-detail/${clientId}/${linkUpdate}/${uuid}`)
    },

    render () {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          columnHeader={this._columnHeader}
          goDetail={this._goDetail}
          onNewClick={this.props.newLink}
        />
      )
    }
  })

  function mapStateToProps (state, props) {
    let id = props.params.clientId
    let newLink = `/client-detail/${id}/${linkNew}`
    return {
      catalogs: state.catalogsStore.all,
      clientId: props.params.clientId,
      newLink
    }
  }

  return connect(mapStateToProps, {
    fetchCatalogs
  })(list)
}
