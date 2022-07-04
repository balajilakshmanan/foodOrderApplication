import React from 'react';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';
import '../../components/Burger/Burger.css';
const burger =(props) =>{
    console.log("IIIIIInn",props.ingredients);
    let transformedIngrediants = Object.keys(props.ingredients).map(igKey =>{
        console.log("IGKEy",igKey);
        //if(igKey!== 'price'){
                return [...Array(props.ingredients[igKey])].map((_, i)=>{
                    return <BurgerIngredient key={igKey + i} type={igKey}/>;
                });
          //  }

            })
            .reduce((arr,el) =>{
                return arr.concat(el);
            },[]); //The [] is initial Value
        if(transformedIngrediants.length === 0){
            transformedIngrediants=<p>Please Start Adding Ingredient!!!</p>
        }
    
    return(
        <div className="Burger">
            <BurgerIngredient type="bread-top"/>
            {transformedIngrediants}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;