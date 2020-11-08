import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Firebase from './FirebaseConfig';
import Login from './components/Login';
import Chat from './components/Chat';



class App extends Component {
  state = {
    user: null
  }
  componentDidMount() {
    this.authListner()
  }
  authListner = () => {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
        Firebase.database().ref('users/').once('value', snapshot => {
          let data = snapshot.val();
          // console.log(Object.values(data))
          this.props.getUsersFromDB(Object.values(data))
        })
      } else {
        this.setState({ user: null })
      }
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.user ? <Chat /> : <Login />}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
  getUsersFromDB: users => dispatch({ type: 'USERFROMDB', payload: users })
})

export default connect(mapStateToProps, mapDispatchToProps)(App);