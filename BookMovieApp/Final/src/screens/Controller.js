import React from 'react';
import Header from '../common/header/Header';
import Home from './home/Home';
import Details from './details/Details';


export default function Controller(){
    return(
        <div id="root">
            <Header />
            {/* <Home /> */}
            <Details/>
        </div>
    )
}