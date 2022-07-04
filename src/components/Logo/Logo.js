import React from 'react';
import BurgerLogo from '../../assets/images/132 burger-logo.png';
import './Logo.css';

const logo =(props)=>(
    <div className="Logo" style={{height:props.height}}>
        <img src={BurgerLogo} alt="MyBurger"/>
    </div>
);


export default logo;