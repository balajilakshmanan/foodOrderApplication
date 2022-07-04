import React ,{ Component } from 'react';
import CheckoutSummary from '../../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route}from 'react-router-dom'
import ContactData from '../../ContactData/ContactData';

class Checkout extends Component {
    state={
        ingredients:{},
        price:0
    }

    componentWillMount=()=>{
        console.log("this.props.location",this.props.location)
        const query=new URLSearchParams(this.props.location.search);
        console.log("Query",query);
        let ingredient={};
        let totalPrice=0;  
        console.log("query.entries()",query.entries())     
        for(let param of query.entries()){
            console.log("Param",param);
            if(param[0] ==='price'){
                totalPrice=param[1];
            }
            else{
                ingredient[param[0]]=+param[1];
            }
        }
        console.log("BalajiIngredient",ingredient);
        this.setState({ingredients:ingredient,price:totalPrice});
    };

    checkoutCancelledHandler=()=>{
        this.props.history.goBack(); 
    }
    
    checkoutContinueHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                {/* {"this.state.price",this.state.price} */}
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinue={this.checkoutContinueHandler}/>
                <Route path={this.props.match.path + '/contact-data'}
                    render={(props)=>(<ContactData ingredients ={this.state.ingredients} price={this.state.price} {...props}/>)}/>
                {/* <Route path={this.props.match.path + '/contact-data'} component={ContactData}/> */}
            </div>
        );
    }
}

export default Checkout;