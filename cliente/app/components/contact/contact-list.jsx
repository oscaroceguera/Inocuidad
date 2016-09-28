import React from 'react'
import {listWrapper} from '../hocs/list-wrapper.jsx'
import TableList from '../commons/generic-table.jsx'

const BAR_MENU = {
  title: 'Contactos',
  avatar: 'mdi mdi-email',
  path: '/'
}

const COLUMN_HEADERS = {
  columns: [
    {
      key: 'companyName',
      label: 'Empresa'
    },
    {
      key: 'services',
      label: 'Servicios'
    },
    {
      key: 'contactName',
      label: 'Contacto'
    },
    {
      key: 'contactPhone',
      label: 'Teléfono'
    },
    {
      key: 'contactEmail',
      label: 'Email'
    }
  ]
}

let ContactList = (props) => {
  return (
    <div>
      <TableList
        subMenuBar={BAR_MENU}
        columns={COLUMN_HEADERS.columns}
        data={props.contact}
        onRowSelection={props.goDetail}
        onNewClick='/contacts-new'
        onDelete={props.onDelete}
      />
    </div>
  )
}

export default listWrapper(ContactList, 'contacts', 'contacts-info', true)
