import React, {Component} from 'react'
import AppBar from './pages/app-bar.jsx'

export default class App extends Component {

  render () {
    return (
      <div>
        <AppBar />
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
