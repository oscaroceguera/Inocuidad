import React from 'react'
import Table from 'material-ui/lib/table/table'
import TableHeader from 'material-ui/lib/table/table-header'
import TableRow from 'material-ui/lib/table/table-row'
import TableHeaderColumn from 'material-ui/lib/table/table-header-column'
import TableBody from 'material-ui/lib/table/table-body'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import EmptyText from './empty-text.jsx'
import IconButton from 'material-ui/lib/icon-button'
import SubmenuBar from './submenu-bar.jsx'
import { Link } from 'react-router'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import Snackbar from 'material-ui/lib/snackbar'

import { Styles } from 'material-ui'

let styles = {
  ROW: {
    cursor: 'pointer'
  },
  EMPTY_TABLE: {
    paddingTop: '1em'
  },
  FLOAT_BUTTON: {
    bottom: '2rem',
    position: 'fixed',
    right: '2rem',
    zIndex: '1'
  },
  DELETE_COLUMN: {
    width: '50px'
  },
  DELETE_BUTTON: {
    color: Styles.Colors.grey600
  }
}

const TableList = React.createClass({
  getDefaultProps () {
    return {
      defaultBodyProps: {
        displayRowCheckbox: false,
        deselectOnClickaway: true,
        showRowHover: true,
        rowKey: 'uuid'
      },
      defaultHeaderProps: {
        displaySelectAll: false,
        adjustForCheckbox: false,
        multiSelectable: false,
        displayMember: 'label',
        columnStyle: {}
      },
      bodyProps: {},
      headerProps: {},
      columns: [],
      data: [],
      displayDeleteColumn: true,
      context: this
    }
  },

  getInitialState () {
    return {
      open: true
    }
  },

  _handleRequestClose () {
    this.setState({
      open: false
    })
  },

  _renderAlert () {
    if (this.props.errorMessage) {
      return (
        <Snackbar
          ref='snackbar'
          open={this.state.open}
          message={this.props.errorMessage}
          autoHideDuration={4000}
          action='aceptar'
          onActionTouchTap={this._handleRequestClose}
          onRequestClose={this._handleRequestClose}
        />
      )
    }
  },

  _bindDelete (item, index) {
    return (e) => {
      e.stopPropagation()
      this._onDelete(item, index)
    }
  },

  _onDelete (item) {
    if (this.props.onDelete) {
      this.props.onDelete(item)
    }
  },

  _createHeaders () {
    let columns = this.props.columns
    let displayDeleteColumn = this.props.displayDeleteColumn
    let headerProps = {
      ...this.props.defaultHeaderProps,
      ...this.props.headerProps
    }

    let headers = columns.map((col, index) => {
      return (
        <TableHeaderColumn key={index} style={headerProps.columnStyle}>
          {col[headerProps.displayMember]}
        </TableHeaderColumn>
      )
    })

     // Add an extra header for the delete button
    if (displayDeleteColumn) {
      headers.push(
        <TableHeaderColumn key='delete' style={styles.DELETE_COLUMN} />
      )
    }
    return headers
  },

  _createRows (rowKey) {
    let {
      data,
      emptyListText
    } = this.props

    let rows = data.map((item, index) => {
      let rowKey = item[rowKey] || index
      return (
        <TableRow key={rowKey} style={styles.ROW}>
          {this._createColumns(item, index, rowKey)}
        </TableRow>
      )
    })

    if (rows.length === 0) {
      rows.push(
        <TableRow key='empty'>
          <TableRowColumn>
            <EmptyText text={emptyListText} style={styles.EMPTY_TABLE} />
          </TableRowColumn>
        </TableRow>
      )
    }

    return rows
  },

  _createColumns (item, rowIndex, rowKey) {
    let {
      columns,
      displayDeleteColumn
    } = this.props

    let cols = columns.map((col, index) => {
      // expecify a unique identifer for each column
      let key = rowKey + '-' + index

      return (
        <TableRowColumn key={key} style={col.style}>
          {this._getCellContent(col, item, index, key)}
        </TableRowColumn>
      )
    })

    // Add an extra column with the delete button
    if (displayDeleteColumn) {
      cols.push(
        <TableRowColumn key='delete' style={styles.DELETE_COLUMN}>
          <IconButton
            iconClassName='mdi mdi-delete'
            iconStyle={styles.DELETE_BUTTON}
            onClick={this._bindDelete(item, rowIndex)}
          />
        </TableRowColumn>
      )
    }

    return cols
  },

  _getCellContent (column, item, index, columnKey) {
    let originalKey = column.key
    let keys = []
    let content = null

    // If th ecolumn has a format function, user it
    if (column.format) {
      // Send key if available or index
      let key = originalKey || index

      content = column.format.call(this.props.context, item, key, columnKey)

      return content
    } else if (originalKey) {
      keys = originalKey.split('.')

      // uspport for nested properties eg. "person.type.id"
      content = keys.reduce((mem, key) => {
        if (mem) {
          mem = mem[key]
        }
        return mem
      }, item)

      return content
    }

    return content
  },

  _onRowSelection (selectedRows) {
    let data = this.props.data
    let selectedIndex = selectedRows[0]
    let item = data[selectedIndex]

    // send the selected element object to the callback
    if (this.props.onRowSelection && item) {
      this.props.onRowSelection(item)
    }
  },

  _subMenuBar () {
    if (!this.props.subMenuBar) {
      return
    }

    return <SubmenuBar {...this.props.subMenuBar}/>
  },

  render () {
    let headerProps = {
      ...this.props.defaultHeaderProps,
      ...this.props.headerProps
    }

    let bodyProps = {
      ...this.props.defaultBodyProps,
      ...this.props.bodyProps
    }

    let rowKey = bodyProps.rowKey

    let headers = this._createHeaders()
    let rows = this._createRows(rowKey)

    return (
      <div>
        {this._subMenuBar()}
        <Table onRowSelection={this._onRowSelection}>
          <TableHeader {...headerProps}>
            <TableRow>
              {headers}
            </TableRow>
          </TableHeader>
          <TableBody {...bodyProps}>
            {rows}
          </TableBody>
        </Table>
        <Link to={this.props.onNewClick}>
          <FloatingActionButton style={styles.FLOAT_BUTTON}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
        {this._renderAlert()}
      </div>
    )
  }

})

export default TableList
