import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link, useHistory,withRouter } from 'react-router-dom';



//pages to import
import DefaultPage from '../Default/DefaultPage';
import LoginPage from '../Login/LoginPage';
import CreateAccount from '../SignUp/AccountCreation';
import UsersPage from '../Users/UsersPage';





function App() {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);





  return (
    <Router>
      <Switch>
        {/* Home page with Flashcards and FlashcardGenerator */}
        <Route exact path="/" component={withRouter(DefaultPage)} />

        {/* Login page */}

        <Route path="/login" component={withRouter(LoginPage)} />
        <Route path="/signup" component={withRouter(CreateAccount)} />
        <Route
          exact
          path="/users"
          component = {withRouter(UsersPage)}
        />
      </Switch>
    </Router>
  );
}

export default App;