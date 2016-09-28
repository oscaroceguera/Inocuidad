import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../../actions/clients'
import * as c from '../../../../actions/types'
import {ListWrapperClient} from '../../../hocs/list-client-complementary.jsx'
import TableList from '../../../commons/generic-table.jsx'

const COLUMN_HEADERS = {
  columns: [
    {
      key: 'storageName',
      label: 'Nombre'
    },
    {
      key: 'country',
      label: 'País'
    },
    {
      key: 'state',
      label: 'Estado'
    },
    {
      key: 'city',
      label: 'Municipio'
    },
    {
      key: 'products',
      label: 'Productos'
    }
  ]
}

const CDistribucion = React.createClass({
  componentWillMount () {
    this.props.fetchAll(this.props.clientId, 'storages', c.FETCH_STORAGES)
  },

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.storageDelete) {
      return this.props.fetchAll(this.props.clientId, 'storages', c.FETCH_STORAGES)
    }
    return
  },

  _onDelete (item) {
    return this.props.deleteItem(item.uuid, 'storages', c.DELETE_STORAGE)
  },

  render () {
    return (
      <div>
        <TableList
          columns={this.props.columnHeader(COLUMN_HEADERS.columns)}
          data={this.props.storages}
          onRowSelection={this.props.goDetail}
          onNewClick={this.props.onNewClick}
          onDelete={this._onDelete}
        />
      </div>
    )
  }
})

function mapStateToProps (state, props) {
  return {
    storages: state.clientData.storages,
    storageDelete: state.clientData.storageDelete
  }
}

let CDList = connect(mapStateToProps, actions)(CDistribucion)

export default ListWrapperClient(CDList, 'centros-distribucion-new', 'centros-distribucion-edit')
