import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Modal/Button/Button';
import './CheckoutSummary.css';
const checkoutSummary = (props) =>{
    console.log("Ingredient",props.ingredients);
    return(
        <div className="CheckoutSummary">
            <h1>We hope it tastes Well</h1>
            <div style={{width:'100%',margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
            btnType="Danger" 
            clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinue}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;