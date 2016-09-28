import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../../actions/clients'
import * as c from '../../../../actions/types'
import {ListWrapperClient} from '../../../hocs/list-client-complementary.jsx'
import TableList from '../../../commons/generic-table.jsx'

const COLUMN_HEADERS = {
  columns: [
    {
      key: 'packingName',
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

const Empaques = React.createClass({
  componentWillMount () {
    this.props.fetchAll(this.props.clientId, 'packings', c.FETCH_PACKINS)
  },

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.packingDelete) {
      return this.props.fetchAll(this.props.clientId, 'packings', c.FETCH_PACKINS)
    }
    return
  },

  _onDelete (item) {
    return this.props.deleteItem(item.uuid, 'packings', c.DELETE_PACKING)
  },

  render () {
    return (
      <div>
        <TableList
          columns={this.props.columnHeader(COLUMN_HEADERS.columns)}
          data={this.props.packings}
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
    packings: state.clientData.packings,
    packingDelete: state.clientData.packingDelete
  }
}

let EmpaqueList = connect(mapStateToProps, actions)(Empaques)

export default ListWrapperClient(EmpaqueList, 'empaques-new', 'empaques-edit')
