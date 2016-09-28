import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../../actions/clients'
import * as c from '../../../../actions/types'
import {ListWrapperClient} from '../../../hocs/list-client-complementary.jsx'
import TableList from '../../../commons/generic-table.jsx'

const COLUMN_HEADERS = {
  columns: [
    {
      key: 'storehouseName',
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

const Almacenes = React.createClass({
  componentWillMount () {
    this.props.fetchAll(this.props.clientId, 'storehouses', c.FETCH_STOREHOUSES)
  },

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.storehouseDelete) {
      return this.props.fetchAll(this.props.clientId, 'storehouses', c.FETCH_STOREHOUSES)
    }
    return
  },

  _onDelete (item) {
    return this.props.deleteItem(item.uuid, 'storehouses', c.DELETE_STOREHOUSE)
  },

  render () {
    return (
      <div>
        <TableList
          columns={this.props.columnHeader(COLUMN_HEADERS.columns)}
          data={this.props.storehouses}
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
    storehouses: state.clientData.storehouses,
    storehouseDelete: state.clientData.storehouseDelete
  }
}

let AlmacenList = connect(mapStateToProps, actions)(Almacenes)

export default ListWrapperClient(AlmacenList, 'almacenes-new', 'almacenes-edit')
