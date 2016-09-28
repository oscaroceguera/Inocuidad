import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../../actions/clients'
import * as c from '../../../../actions/types'
import {ListWrapperClient} from '../../../hocs/list-client-complementary.jsx'
import TableList from '../../../commons/generic-table.jsx'

const COLUMN_HEADERS = {
  columns: [
    {
      key: 'plantName',
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

const Plantas = React.createClass({
  componentWillMount () {
    this.props.fetchAll(this.props.clientId, 'plants', c.FETCH_PLANTS)
  },

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.plantDelete) {
      return this.props.fetchAll(this.props.clientId, 'plants', c.FETCH_PLANTS)
    }
    return
  },

  _onDelete (item) {
    return this.props.deleteItem(item.uuid, 'plants', c.DELETE_PLANT)
  },

  render () {
    return (
      <div>
        <TableList
          columns={this.props.columnHeader(COLUMN_HEADERS.columns)}
          data={this.props.plants}
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
    plants: state.clientData.plants,
    plantDelete: state.clientData.plantDelete
  }
}

let PlantasList = connect(mapStateToProps, actions)(Plantas)

export default ListWrapperClient(PlantasList, 'plantas-new', 'plantas-edit')
