
import './App.css';
import React, {useState, useEffect} from "react"
import Registration from './Pages/Registration'
import Login from './Pages/Login'
import AdminSelect from './Pages/AdminSelect'
import Stickers from './Pages/Stickers'
import Help from './Pages/Help'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Bartender  from './Pages/Bartender';
import Drinks from './Pages/Drinks';

function App() {
  const [userType, setUserType] = React.useState("user");
  const [csrfToken, setCSRFToken] = React.useState("");
  const [isAuth, setIsAuth] = React.useState("");

  useEffect(() => {
    fetch("http://localhost:8000/csrf/", {
      credentials: "include",
  })
  .then((res) => {
      let csrfToken = res.headers.get("X-CSRFToken");
      setCSRFToken(csrfToken)
      console.log(res)
  })
  .catch((err)=> {
      console.error(err)
  });
  }, [])

  function handleUserType(e) {
    setUserType(e)
  }
  return ( 
    <div class = "row">
      <div class = "stay">
    <BrowserRouter>
    <Switch>
      <Route path ="/register">
        <Registration userType = {userType} handleUserType = {handleUserType}/>
      </Route>
      <Route path="/admin">
        <AdminSelect userType = {userType} handleUserType = {handleUserType}/>
      </Route>
      <Route path="/bartender">
        <Bartender userType = {userType} handleUserType = {handleUserType}/>
      </Route>
      <Route path = "/drinks">
        <Drinks userType = {userType} handleUserType = {handleUserType}/>
      </Route>
      <Route path = "/stickers">
        <Stickers csrfToken = {csrfToken} userType = {userType} handleUserType = {handleUserType}/>
      </Route>
      <Route path="/registration">
        <Registration csrfToken = {csrfToken} setCSRFToken = {setCSRFToken} userType = {userType} handleUserType = {handleUserType}/>
      </Route>
      <Route path = "/help">
        <Help />
      </Route>
      <Route path="/">
        <Login csrfToken = {csrfToken} setCSRFToken = {setCSRFToken} userType = {userType} handleUserType = {handleUserType}/>
      </Route>
      
    </Switch>
  </BrowserRouter>
  </div>
  </div>
  );

// function toggleSidebar(){
//   if(openBar){
//       setOpenBar(false);
//   }else{
//       setOpenBar(true);
//   }
// }
}

export default App;


