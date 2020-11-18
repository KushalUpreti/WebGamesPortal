import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Containers/Homepage';
import Header from './shared/NavComponents/Header';
import Gamepage from './pages/Containers/Gamepage';
import CategoryPage from './pages/Containers/CategoryPage';
import UserPage from "./users/UserPage"
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
    }
  }, []);

  const logIn = useCallback(() => {
    setState({
      loggedIn: true
    });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem("userCred");
    setState({
      loggedIn: false
    })
  }, []);

  let routes = null;
  if (!state.loggedIn) {
    routes = (
      <>
        <Switch>
          <Route path="/WebGamesPortal" exact>
            <Homepage />
          </Route>

          <Route path="/WebGamesPortal/game" >
            <Gamepage />
          </Route>

          <Route path="/WebGamesPortal/category">
            <CategoryPage />
          </Route>
          <Redirect to="/WebGamesPortal"></Redirect>
        </Switch>

      </>
    )
  } else {
    routes = (
      <>
        <Switch>
          <Route path="/WebGamesPortal" exact>
            <Homepage />
          </Route>

          <Route path="/WebGamesPortal/game" >
            <Gamepage />
          </Route>

          <Route path="/WebGamesPortal/category">
            <CategoryPage />
          </Route>

          <Route path="/WebGamesPortal/user">
            <UserPage />
          </Route>
          {/* <Redirect to="/WebGamesPortal"></Redirect> */}
        </Switch>

      </>
    )
  }

  return (
    <BrowserRouter >

      <AuthContext.Provider value={{
        loggedIn: state.loggedIn,
        signIn: logIn,
        signOut: logOut
      }}>

        <div className="App">
          <Header />

          {routes}

        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
