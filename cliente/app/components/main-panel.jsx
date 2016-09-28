import React from 'react'
import { connect } from 'react-redux'
import MainCard from './main-card.jsx'
import * as actions from '../actions/modules'
import LinearProgress from 'material-ui/lib/linear-progress'
import Snackbar from 'material-ui/lib/snackbar'
import _ from 'lodash'

const MainPanel = React.createClass({
  getInitialState () {
    return {
      open: true,
      loaded: false
    }
  },

  componentWillMount () {
    const token = localStorage.getItem('token')
    if (token) {
      this.props.fetchModules()
    }
  },

  componentWillReceiveProps (next_props) {
    if (!this.state.loaded) {
      this.props.fetchModules()
      this.setState({
        loaded: true
      })
    }
  },

  handleRequestCLose () {
    this.setState({
      open: false
    })
  },

  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <Snackbar
          ref='snackbar'
          open={this.state.open}
          message={this.props.errorMessage}
          autoHideDuration={4000}
          action='aceptar'
          onActionTouchTap={this.handleRequestCLose}
          onRequestClose={this.handleRequestCLose}
        />
      )
    }
  },

  render () {
    let modules = this.props.modules
    let userModules = _.split(this.props.userModules, ',')

    userModules = _.map(userModules, (userModule) => {
      return _.find(modules, (module) => {
        return module.acronym === userModule
      })
    })

    if (userModules[0] === undefined) {
      return <LinearProgress mode='indeterminate'/>
    }

    let modulesList = userModules.map((module, index) => {
      return (
        <MainCard
          key={module.id}
          title={module.title}
          subtitle={module.subtitle}
          items={module.items}
          image={module.image}
          path={module.path}
          avatar={module.avatar}/>
      )
    })

    return (
      <div className='wrap__card'>
        {modulesList}
        {this.renderAlert()}
      </div>
    )
  }
})

function mapStateToProps (state) {
  return {
    modules: state.modulesStore.all,
    userModules: state.auth.session.modules,
    errorMessage: state.modulesStore.error
  }
}

export default connect(mapStateToProps, actions)(MainPanel)
