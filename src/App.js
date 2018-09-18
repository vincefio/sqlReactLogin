import React, { Component } from 'react';
import { Navbar, NavItem, Button, Icon } from 'react-materialize'
import './App.css';
import { Route, Link, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'

const DisplayLinks = props => {
  if (props.loggedIn) {
    return (
      <nav >
        <div className="nav-wrapper black">
          <a href="/" id="logo" className="brand-logo">Logo</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/">
              Home
            </Link></li>
            <li><Link to="#" onClick={props._logout}>
              Logout
            </Link></li>
          </ul>
        </div>
      </nav>
    )
  } else {
    return (
      <nav>
        <div className="nav-wrapper black">
          <a href="/" id="logo" className="brand-logo">Logo</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">

            <li><Link to="/login">
              Login
            </Link></li>
            <li><Link to="/signup">
              Register
            </Link></li>

          </ul>
        </div>
      </nav>
    )
  }

}


class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      user: null
    }
    // this._logout = this._logout.bind(this)
    //this._login = this._login.bind(this)
  }
  updateUser = (name) => {
    this.setState({
      loggedIn: true,
      user: name
    })
  }

  _logout = (event) => {
    event.preventDefault()
    console.log('LOGGING OUT')
    this.setState({
      loggedIn: false,
      user: null
    })
  }

  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />

          {/*Routes*/}
          <Route exact path="/" render={() => <Home user={this.state.user} />} />
          <Route exact path="/login" render={() => <Login changeAppState={this.updateUser} />} />
          <Route exact path="/signup" render={() => <Signup changeAppState={this.updateUser} />} />

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
