import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import '../../Navigation/NavigationItems/NavigationItems.css'; 
import '../NavigationItems/NavigationItem/NavigationItem.css';
import Backdrop from '../../UI/Modal/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';
const sideDrawer =(props) =>{

    let attachedClasses=['SideDrawer','Close'].join(' ');

    if(props.open){
        attachedClasses=['SideDrawer','Open'].join(' ');
    }

    return (
        <Aux>
          <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses}>
            <div className="Lock">
                <Logo />
            </div>
            <nav >
                <NavigationItems />
            </nav>
        </div> 
        </Aux>
    );
};

export default sideDrawer;