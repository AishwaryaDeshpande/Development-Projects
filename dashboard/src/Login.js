import './Login.css';
import React, { Fragment, useState } from 'react';
import axios from 'axios';
import {useHistory,Link} from 'react-router-dom';

function Login() {

  let history = useHistory();
  const [registrationValues, setRegistrationValues] = useState({
    name: "",
    email: "",
    password: "",
    dataSent: false
  })

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
    dataSent: false
  })

  const [userExists, setUserExists] = useState(false)

  const handleLoginInputChange = (event) =>{
    const state = loginValues;
    state[event.target.name] = event.target.value;
    setLoginValues({...state});
    console.log(loginValues)
  }

  const handleRegisterInputChange = (event) =>{
    const state = registrationValues;
    state[event.target.name] = event.target.value;
    setRegistrationValues({...state});
    console.log(registrationValues)
  }

  const handleRegistrationFormSubmit = (event) =>{
    event.preventDefault();
    console.log(registrationValues);
    axios({method: 'post', url :"http://localhost/reactScrud/react.php", 
     data:registrationValues,
     headers: { 'content-type': 'application/json' }
  }).then(res => {
      if(res.data == "Registration successfully"){
        setRegistrationValues({...registrationValues,dataSent:true});
        setToggle(!toggle)
        console.log(res.data);
        
      }     
    })
  }

  const handleLoginFormSubmit = (event) =>{
    event.preventDefault();
    console.log(loginValues);
    axios({method: 'post', url :"http://localhost/reactScrud/login.php", 
     data:loginValues,
     headers: { 'content-type': 'application/json' }
    }).then(res => {
      if(res.data == "user exists"){
        setUserExists(true);
        console.log("User exists")
        history.push('/project')
      }else{
        console.log("User does not exists")
        
      }
      setLoginValues({...loginValues,dataSent:true});
    })

  }
  const [toggle, setToggle] = useState(false);
  
  const handleTabClick = (event) =>{
    console.log("clicked")
    setToggle(!toggle)
  }
  const loginStyle = {background: toggle ? "#ffffff"  : "#635b5b",color:toggle ? "#635b5b" : "#ffffff"}

  const registerStyle = {background: toggle ? "#635b5b" : "#ffffff",color:toggle ? "#ffffff" : "#635b5b"}
  return (
    <Fragment>
        <div>
            {registrationValues.dataSent ? <div>Registration Successful Please Login.</div> :null}
        </div>
      <section className="register-login">
      <ul className="tabs">
        <li  style = {loginStyle} onClick = {handleTabClick}>Login</li>
        <li  style = {registerStyle} onClick = {handleTabClick}>Register</li>
      </ul>
      <ul className="tab_content">
        <li style = {{display: toggle ? 'None' : 'block'}}>  
          <div className="content_wrapper">
            <form className="form" action= "/action_page.php" onSubmit = {handleLoginFormSubmit}>
              <input  onChange = {handleLoginInputChange} value = {loginValues.email} type="text" id="email" name ="email" placeholder="Email"></input>
              <input  onChange = {handleLoginInputChange} value = {loginValues.password} type="text" id="password" name ="password" placeholder="Password"></input>
              <input className="submit-button" type="submit" value="Login" />
            </form>
          </div>
        </li>
        <li style = {{display: toggle ? 'block' : 'None'}}>
          <div className="content_wrapper">
            <form className="form" action= "/action_page.php" onSubmit = {handleRegistrationFormSubmit}>
              <input onChange = {handleRegisterInputChange} value = {registrationValues.name} type="text" id="name" name ="name" placeholder="Name"></input>
              <input  onChange = {handleRegisterInputChange} value = {registrationValues.email} type="text" id="email" name ="email" placeholder="Email"></input>
              <input  onChange = {handleRegisterInputChange} value = {registrationValues.password} type="text" id="password" name ="password" placeholder="Password"></input>
              <input className="submit-button" type="submit" value="Register" />
            </form>
          </div>
        </li>
      </ul>      
    </section>
    </Fragment>
  );
}

export default Login;
