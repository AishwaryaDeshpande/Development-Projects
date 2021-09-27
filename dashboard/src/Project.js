import React, { Fragment, useState } from 'react';
import {Redirect} from "react-router-dom";
import './Project.css';

function Project({authorized}) {
//   if(!authorized){
//     return <Redirect to="/"></Redirect>
// }
    const [projectDetails, setProjectDetails] = useState({
      clientId: "",
      clientName: "",
      clientWebsite: "",
      dataSent: false
    })

    const handleInputChange = (event) =>{
      console.log("input change")
    }

    const handleCreateNewProject = (event) =>{
      event.preventDefault();
    }
    return (
      
      <Fragment>
        <div id="new-project">
        <div className="content_wrapper">
            <form className="project-form" action= "" onSubmit = {handleCreateNewProject}>
              <input  onChange = {handleInputChange} value = {projectDetails.clientId} type="text" id="clientId" name ="clientId" placeholder="Client Id"></input>
              <input  onChange = {handleInputChange} value = {projectDetails.clientName} type="text" id="clientName" name ="clientName" placeholder="Name"></input>
              <input  onChange = {handleInputChange} value = {projectDetails.clientWebsite} type="text" id="clientWebsite" name ="clientWebsite" placeholder="Website Link"></input>
              <input className="submit-button" type="submit" value="Create New Project" />
            </form>
          </div>
        </div>
          
      </Fragment>

    );
  }
  
export default Project;