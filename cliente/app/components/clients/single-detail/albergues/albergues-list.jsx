import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../../actions/clients'
import * as c from '../../../../actions/types'
import {ListWrapperClient} from '../../../hocs/list-client-complementary.jsx'
import TableList from '../../../commons/generic-table.jsx'

const COLUMN_HEADERS = {
  columns: [
    {
      key: 'hostelName',
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
      key: 'responsibleHostel',
      label: 'Responsable'
    }
  ]
}

const Albergues = React.createClass({
  componentWillMount () {
    this.props.fetchAll(this.props.clientId, 'hostels', c.FETCH_HOSTELS, 'albergues')
  },

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.hostelDelete) {
      return this.props.fetchAll(this.props.clientId, 'hostels', c.FETCH_HOSTELS, 'albergues')
    }
    return
  },

  _onDelete (item) {
    return this.props.deleteItem(item.uuid, 'hostels', c.DELETE_HOSTEL)
  },

  render () {
    return (
      <div>
        <TableList
          columns={this.props.columnHeader(COLUMN_HEADERS.columns)}
          data={this.props.hostels}
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
    hostels: state.clientData.hostels,
    hostelDelete: state.clientData.hostelDelete
  }
}

let AlbergueList = connect(mapStateToProps, actions)(Albergues)

export default ListWrapperClient(AlbergueList, 'albergues-new', 'albergues-edit')
