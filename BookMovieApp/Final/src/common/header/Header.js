import React from 'react';
import './Header.css';
import logo from 'D:/FrontEndProjects/BookMovieApp/Final/src/assets/logo.svg';
import Button from '@material-ui/core/Button';
import { Fragment } from 'react';
import Modal from '@material-ui/core/Modal';
import BookShow from 'D:/FrontEndProjects/BookMovieApp/Final/src/screens/bookshow/BookShow';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab'; 
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { ValidatorForm,TextValidator } from 'react-material-ui-form-validator';

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
            <Typography>{children}</Typography>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  

const Header = function(){
    const [userLoggedIn, setUserLogin] = React.useState(false); 
    const [open,setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [registration, setRegistration] = React.useState(false);
    const [userLogin, setuserLogin] = React.useState({
        id:0,
        username:"",
        password:""
    });
    const [userRegister, setuserResgistration] = React.useState({
        id:0,
        firstname:"",
        lastname:"",
        registerPassword:"",
        email:"",
        contactNumber:""
    });

    const onSubmitLogin = async function(){
        const param = window.btoa(`${userLogin.username}:${userLogin.password}`);
        try{
            const rawResponse = await fetch('http://localhost:8085/api/v1/auth/login',{
            method:'POST',
            headers:{
                mode: 'no-cors',
                "Accept": "application/json",
                authorization: `Basic ${param}`,
                "Content-Type":"application/json;charset=UTF-8"
            }
            });
            const result = await rawResponse.json();
            if(rawResponse.ok){
                console.log(userRegister);
                setUserLogin(true)
            }else{
                const error = new Error();
                error.message = result.message || "default error messgae";
                throw error;
            }
        }catch(e){
            alert(`Error: ${e.message}` )
            

        }    
        //window.location.pathname = "/"  
        LoginPopUpClose();   
        console.log("Login Submit");
        
    }

    const onSubmitRegistration = async function(){
        const param = {
            email_address: userRegister.email,
            first_name: userRegister.firstname,
            last_name: userRegister.lastname,
            mobile_number: userRegister.contactNumber,
            password: userRegister.registerPassword
          }
        try{
            const rawResponse = await fetch('http://localhost:8085/api/v1/signup',{
            body: JSON.stringify(param),
            method:'POST',
            headers:{
                "Accept": "application/json",
                "Content-Type":"application/json;charset=UTF-8"
            }
            });
            const result = await rawResponse.json();
            if(rawResponse.ok){
                console.log(userRegister);
                setRegistration(true)
            }else{
                const error = new Error();
                error.message = result.message || "default error messgae";
                throw error;
            }
        }catch(e){
            alert(`Error: ${e.message}` )

        }   
        LoginPopUpClose();    
        //window.location.pathname = "/"                
    }

    const LoginPopUpClose = () =>{
        console.log("close");
        setOpen(false);
    }

    const bookShowPage=()=>{
        if(userLoggedIn){
            console.log("Book show")
        }else{
            console.log("User Not Logger In");
            setOpen(true);
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

     
    const inputChangedHandler = (e) =>{
        const state = userLogin;
        state[e.target.name] = e.target.value;
        setuserLogin({...state});

    }
    const registrationInputChangedHandler = (e) =>{
        const state = userRegister;
        state[e.target.name] = e.target.value;
        setuserResgistration({...state});

    }

    const loginLogoutHandler = () => {
        setOpen(true)
    }

    const {username,password} = userLogin;
    const {firstname,lastname,email,registerPassword,contactNumber} = userRegister;
    const Login = () => <Button onClick={loginLogoutHandler} className = "right" id = "login" variant="contained">Login</Button>
    const Logout = () =>  <Button className = "right" id = "logout" variant="contained">Logout</Button>

    return(
        <Fragment>
        <div className="header">
            <img id = "logo" className= "rotating" src={logo}></img>
            {userLoggedIn ? <Logout /> : <Login />} 
            {/* <BookShow /> */}
            <Button className = "right" id="book_show_button" variant="contained" color="primary" onClick={bookShowPage}>Book Show</Button>
        </div>
        <Modal closeAfterTransition open={open} onClose={LoginPopUpClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
            <div>                
                <div className="test" id="LoginPopUp">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Login" {...a11yProps(0)} />
                        <Tab label="Register" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <ValidatorForm className="subscriber-form" onSubmit={onSubmitLogin}>
                            <TextValidator id="username" type="text" name = "username"
                            label="UserName*" validators= {['required']} errorMessages = {['required']}
                            value = {username}  onChange = {inputChangedHandler}>
                            </TextValidator>
                            <TextValidator id="password" type="text" name = "password"  label="Password*"  
                            validators= {['required']} errorMessages = {['required']} value = {password}
                            onChange = {inputChangedHandler}>
                            </TextValidator>
                            <Button type="submit" className="loginSubmit" variant="contained" color="primary">Login</Button>
                        </ValidatorForm>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ValidatorForm className="subscriber-form" onSubmit={onSubmitRegistration}>
                            <TextValidator
                                id="firstname" type="text" name = "firstname"  label="First Name*" 
                                validators= {['required']}  errorMessages = {['required']} 
                                value = {firstname}  onChange = {registrationInputChangedHandler}>                                    
                            </TextValidator>
                            <TextValidator
                                id="lastname" type="text" name = "lastname"  label="Last Name*" 
                                validators= {['required']}  errorMessages = {['required']} 
                                value = {lastname}  onChange = {registrationInputChangedHandler}>                                    
                            </TextValidator>
                            <TextValidator
                                id="email" type="text" name = "email"  label="Email*" 
                                validators= {['required']}  errorMessages = {['required']} 
                                value = {email}  onChange = {registrationInputChangedHandler}>                                    
                            </TextValidator>
                            <TextValidator
                                id="registerPassword" type="text" name = "registerPassword"  label="Password*" 
                                validators= {['required']}  errorMessages = {['required']} 
                                value = {registerPassword}  onChange = {registrationInputChangedHandler}>                                    
                            </TextValidator>
                            <TextValidator
                                id="contactNumber" type="text" name = "contactNumber"  label="Contact Number*" 
                                validators= {['required']}  errorMessages = {['required']} 
                                value = {contactNumber}  onChange = {registrationInputChangedHandler}>                                    
                            </TextValidator>
                            {registration ? <p>Registration Successful. Please Login! </p> : null}
                            <Button type="submit" className="loginSubmit" variant="contained" color="primary">Register</Button>
                        </ValidatorForm>
                    </TabPanel>                                       
                </div>
            </div>
        </Modal>        
      </Fragment>
    )
}


export default Header;