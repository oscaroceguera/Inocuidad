import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../../actions/clients'
import * as c from '../../../../actions/types'
import {ListWrapperClient} from '../../../hocs/list-client-complementary.jsx'
import TableList from '../../../commons/generic-table.jsx'

const COLUMN_HEADERS = {
  columns: [
    {
      key: 'pondName',
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
      key: 'species',
      label: 'Especies'
    }
  ]
}

const Empaques = React.createClass({
  componentWillMount () {
    this.props.fetchAll(this.props.clientId, 'ponds', c.FETCH_PONDS)
  },

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.pondDelete) {
      return this.props.fetchAll(this.props.clientId, 'ponds', c.FETCH_PONDS)
    }
    return
  },

  _onDelete (item) {
    return this.props.deleteItem(item.uuid, 'ponds', c.DELETE_POND)
  },

  render () {
    return (
      <div>
        <TableList
          columns={this.props.columnHeader(COLUMN_HEADERS.columns)}
          data={this.props.ponds}
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
    ponds: state.clientData.ponds,
    pondDelete: state.clientData.pondDelete
  }
}

let EmpaqueList = connect(mapStateToProps, actions)(Empaques)

export default ListWrapperClient(EmpaqueList, 'estanques-new', 'estanques-edit')
