import React from 'react'
import { connect } from 'react-redux'
import * as aux from '../commons/aux-functions'
import { fetchClientInfo } from '../../actions/clients'
import { fetchCatalogs } from '../../actions/catalogs'

export let DetailWrapper = (ComposedComponent) => {
  const detail = React.createClass({

    componentWillMount () {
      this.props.fetchClientInfo(this.props.clientId)
      this.props.fetchCatalogs()
    },

    _basicCatalogs (name, state, isParent = false) {
      let catalogs = this.props.catalogs
      return aux.basicCatalogs(name, catalogs, state, isParent)
    },

    render () {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          basicCatalogs={this._basicCatalogs}
        />
      )
    }
  })

  function mapStateToProps (state, props) {
    return {
      clientId: props.params.clientId,
      client: state.clientData.client,
      catalogs: state.catalogsStore.all
    }
  }

  return connect(mapStateToProps, {fetchCatalogs, fetchClientInfo})(detail)
}
