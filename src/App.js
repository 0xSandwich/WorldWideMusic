import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import './css/main.css';
import Map from './components/Map.js'
import Home from './components/Home.js'
import Header from './components/Header.js'
import About from "./components/About.js";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Redirect exact from="/" to="/home"/>
      <Switch>
        <Route path="/home" component={Home}/>
        <Route path="/map" component={Map}/>
        <Route path="/about" component={About}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
