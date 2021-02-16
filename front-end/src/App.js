import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import React, {useState, useEffect} from "react"
import Registration from './Pages/Registration'
import Login from './Pages/Login'
import AdminSelect from './Pages/AdminSelect'
import Statistics from './Pages/Statistics'
import Stickers from './Pages/Stickers'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import Inventory  from './Pages/Inventory';
import Drinks from './Pages/Drinks';

function App() {
  const [userType, setUserType] = React.useState("user");

  function handleUserType(e) {
    setUserType(e)
  }
  return ( 
    <div>
    <BrowserRouter>
    <Switch>
      <Route path ="/register">
        <Registration userType = {userType} handleUserType = {handleUserType}/>
      </Route>
      <Route path="/login">
        <Login userType = {userType} handleUserType = {handleUserType}/>
      </Route>

      <Route path="/admin">
        <AdminSelect userType = {userType} handleUserType = {handleUserType}/>
      </Route>

      <Route path="/statistics">
        <Statistics userType = {userType} handleUserType = {handleUserType}/>
      </Route>
      <Route path="/inventory">
        <Inventory userType = {userType} handleUserType = {handleUserType}/>
      </Route>
      <Route path = "/drinks">
        <Drinks userType = {userType} handleUserType = {handleUserType}/>
      </Route>

      <Route path = "/stickers">
        <Stickers userType = {userType} handleUserType = {handleUserType}/>
      </Route>

      <Route path="/">
        <Home userType = {userType} handleUserType = {handleUserType}/>
      </Route>
      
    </Switch>
  </BrowserRouter>
  </div>
  );
}

export default App;


