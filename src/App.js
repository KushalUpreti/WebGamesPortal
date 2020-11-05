import React, { } from 'react';
import { BrowserRouter, Route, } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Containers/Homepage';
import Header from './shared/NavComponents/Header';
import Gamepage from './pages/Containers/Gamepage';
import CategoryPage from './pages/Containers/CategoryPage';

function App() {

  return (
    <BrowserRouter basename="/">

      <div className="App">
        <Header />

        <Route path="/" exact>
          <Homepage />
        </Route>

        <Route path="/game">
          <Gamepage />
        </Route>

        <Route path="/category">
          <CategoryPage />
        </Route>

      </div>
    </BrowserRouter>
  );
}

export default App;
