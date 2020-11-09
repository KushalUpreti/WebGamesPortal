import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Containers/Homepage';
import Header from './shared/NavComponents/Header';
import Gamepage from './pages/Containers/Gamepage';
import CategoryPage from './pages/Containers/CategoryPage';


function App() {

  return (
    <BrowserRouter>

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
    </BrowserRouter>
  );
}

export default App;
