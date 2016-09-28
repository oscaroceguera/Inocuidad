import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../../actions/clients'
import * as c from '../../../../actions/types'
import {ListWrapperClient} from '../../../hocs/list-client-complementary.jsx'
import TableList from '../../../commons/generic-table.jsx'

const COLUMN_HEADERS = {
  columns: [
    {
      key: 'productionName',
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
      key: 'pickings',
      label: 'Cultivos'
    }
  ]
}

const UProduccion = React.createClass({
  componentWillMount () {
    this.props.fetchAll(this.props.clientId, 'productions', c.FETCH_PRODUCTIONS)
  },

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.productionDelete) {
      return this.props.fetchAll(this.props.clientId, 'productions', c.FETCH_PRODUCTIONS)
    }
    return
  },

  _onDelete (item) {
    return this.props.deleteItem(item.uuid, 'productions', c.DELETE_PRODUCTION)
  },

  render () {
    return (
      <div>
        <TableList
          columns={this.props.columnHeader(COLUMN_HEADERS.columns)}
          data={this.props.productions}
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
    productions: state.clientData.productions,
    productionDelete: state.clientData.productionDelete
  }
}

let UProductionList = connect(mapStateToProps, actions)(UProduccion)

export default ListWrapperClient(UProductionList, 'unidades-produccion-new', 'unidades-produccion-edit')
