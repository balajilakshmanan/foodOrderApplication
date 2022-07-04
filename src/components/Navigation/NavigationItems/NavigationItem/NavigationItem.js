import React from 'react';
import './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) =>{
    console.log("ACTTT",props);
    
    return (<li className="NavigationItem">
        <NavLink className={props.act}
        to={props.link}
        >{props.children}</NavLink> 
    </li>
    );
};


export default navigationItem;