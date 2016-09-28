import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../../actions/clients'
import * as c from '../../../../actions/types'
import {ListWrapperClient} from '../../../hocs/list-client-complementary.jsx'
import TableList from '../../../commons/generic-table.jsx'

const COLUMN_HEADERS = {
  columns: [
    {
      key: 'labName',
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
      key: 'labBranch',
      label: 'Giro del laboratorio'
    }
  ]
}

const Laboratorios = React.createClass({
  componentWillMount () {
    this.props.fetchAll(this.props.clientId, 'laboratories', c.FETCH_LABORATORIES)
  },

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.laboratoryDelete) {
      return this.props.fetchAll(this.props.clientId, 'laboratories', c.FETCH_LABORATORIES)
    }
    return
  },

  _onDelete (item) {
    return this.props.deleteItem(item.uuid, 'laboratories', c.DELETE_LABORATORY)
  },

  render () {
    return (
      <div>
        <TableList
          columns={this.props.columnHeader(COLUMN_HEADERS.columns)}
          data={this.props.laboratories}
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
    laboratories: state.clientData.laboratories,
    laboratoryDelete: state.clientData.laboratoryDelete
  }
}

let LaboratoriosList = connect(mapStateToProps, actions)(Laboratorios)

export default ListWrapperClient(LaboratoriosList, 'laboratorios-new', 'laboratorios-edit')
