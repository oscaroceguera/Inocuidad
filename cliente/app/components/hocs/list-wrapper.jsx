import React from 'react'
import { connect } from 'react-redux'
import {fetchUsers, deteleteUser} from '../../actions/users'
import {fetchContacts, deleteContact} from '../../actions/contacts'
import { browserHistory } from 'react-router'

export let listWrapper = (ComposedComponent, type, path, pathAditional = false) => {

  const list = React.createClass({

    componentWillMount () {
      switch (type) {
        case 'users':
          return this.props.fetchUsers()
        case 'contacts':
          return this.props.fetchContacts()
      }
    },

    componentWillUpdate (nextProps, nextState) {
      switch (type) {
        case 'users':
          if (nextProps.userDelete) {
            return this.props.fetchUsers()
          }
          return
        case 'contacts':
          if (nextProps.contactDelete) {
            return this.props.fetchContacts()
          }
          return
      }
    },

    _goDetail (item) {
      if (pathAditional) {
        return browserHistory.push(`${path}/${item.uuid}/${item.category}`)
      }
      return browserHistory.push(`${path}/${item.uuid}`)
    },

    _onDelete (item) {
      switch (type) {
        case 'users':
          return this.props.deteleteUser(item.uuid)
        case 'contacts':
          return this.props.deleteContact(item.uuid)
      }
    },

    render () {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          goDetail={this._goDetail}
          onDelete={this._onDelete}
        />
      )
    }
  })

  function mapStateToProps (state) {
    switch (type) {
      case 'users':
        return {
          userData: state.userData.all,
          userDelete: state.userData.delete,
          errorMessage: state.userData.error
        }
      case 'contacts':
        return {
          contact: state.contactData.all,
          contactDelete: state.contactData.delete
        }
    }
  }

  return connect(mapStateToProps, {
    fetchUsers,
    deteleteUser,
    fetchContacts,
    deleteContact
  })(list)
}
