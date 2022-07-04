import React ,{Component}from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Modal/Button/Button';

class OrderSummary extends Component{
    
    componentWillUpdate (){
        console.log('[OrderSummary] WillUpdate');
    }
    
    render(){
        const ingredientSummary=Object.keys(this.props.ingredient)
        .map(igKey =>{
            return (<li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>:{this.props.ingredient[igKey]}</li>);
        });

        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A Delicious burger with the following ingredient:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to Checkout?</p>
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        )
    }
}
export default OrderSummary;