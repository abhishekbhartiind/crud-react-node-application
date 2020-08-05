import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import store from './store';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './store/actions'
import { isEmpty } from './utils'
import setAuthToken from './utils/setAuthToken'
import './App.css';
import Home from './Home';
import Signup from './Signup';
import Todo from './Todo';

//check token
if(isEmpty(localStorage._secret_)){
  // set auth token
  setAuthToken(localStorage._secret_)
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage._secret_);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))
  //check for expired token 
  const currentTime = Date.now()/1000;
  if(decoded.exp < currentTime){
    //logout user
    store.dispatch(logoutUser())
    // clear current profile
    // redirect to login
    window.location.href = '/'
  }
}
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/todo" component={Todo}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
