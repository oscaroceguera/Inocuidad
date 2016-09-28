import React from 'react'
import moment from 'moment'
moment.locale('es')
import {listWrapper} from '../hocs/list-wrapper.jsx'
import TableList from '../commons/generic-table.jsx'

const BAR_MENU = {
  title: 'Usuarios',
  avatar: 'mdi mdi-account-multiple',
  path: '/'
}

function _formatDate (user) {
  let data = moment(user.createdAt).format('DD MMMM YYYY')
  return data
}

const COLUMN_HEADERS = {
  columns: [
    {
      key: 'name',
      label: 'Nombre'
    },
    {
      key: 'email',
      label: 'Email'
    },
    {
      key: 'createdAt',
      label: 'Fecha de alta',
      format: _formatDate
    }
  ]
}

let UserList = (props) => {
  return (
    <div>
      <TableList
        subMenuBar={BAR_MENU}
        columns={COLUMN_HEADERS.columns}
        data={props.userData}
        onNewClick='/users-new'
        onRowSelection={props.goDetail}
        onDelete={props.onDelete}
        errorMessage={props.errorMessage}/>
    </div>
	)
}

export default listWrapper(UserList, 'users', 'users-edit')
