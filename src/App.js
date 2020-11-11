import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Containers/Homepage';
import Header from './shared/NavComponents/Header';
import Gamepage from './pages/Containers/Gamepage';
import CategoryPage from './pages/Containers/CategoryPage';
import AuthContext from './shared/Contexts/AuthContext';


function App() {

  const [state, setState] = useState({
    loggedIn: false
  });

  useEffect(() => {
    if (localStorage.getItem("userCred") !== null) {
      setState({
        loggedIn: true
      });
      console.log("Logged in");
    }
  }, []);

  const logIn = useCallback(() => {
    setState({
      loggedIn: true
    });
    console.log("Signed in");
  }, []);

  const logOut = useCallback(() => {
    setState({
      loggedIn: false
    })
  }, []);

  return (
    <BrowserRouter basename="/">

      <AuthContext.Provider value={{
        loggedIn: state.loggedIn,
        signIn: logIn,
        signOut: logOut
      }}>

        <div className="App">
          <Header />
          <Switch>

            <Route path="/" exact>
              <Homepage />
            </Route>

            <Route path="/game">
              <Gamepage />
            </Route>

            <Route path="/category">
              <CategoryPage />
            </Route>

            <Redirect to="/"></Redirect>
          </Switch>
        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;