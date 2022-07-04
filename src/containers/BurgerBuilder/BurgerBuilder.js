import React , { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Aux from '../../hoc/Aux';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../.././components/UI/Modal/Spinner/Spinner';
const INGREDIENT_PRICES ={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
};

class BurgerBuilder extends Component{
        constructor(props){
            super(props);
        this.state={
            ingredient : null,
            // ingredient : {
            //     salad:0,
            //     bacon:0,
            //     cheese:0,
            //     meat:0
            // },
            totalPrice:4,
            purchaseable:false,
            purchasing:false, 
            loading:false
        }
        //this.addIngredientHandler=this.addIngredientHandler.bind(this);
        }

        componentDidMount=()=>{
            axios.get('https://react-my-burger-bc32e.firebaseio.com/ingredients.json')
                .then(response=>{
                    this.setState({ingredient:response.data});
                }).catch(error=>{this.setState({error:true});});
        }

    updatePurchaseState= ( ingredient )=>{
        const sum = Object.keys(ingredient)
            .map(igKey=>{
                return ingredient[igKey];
            })
            .reduce((sum,ele)=>{
                return sum + ele;
            },0);
            this.setState({purchaseable: sum > 0});
    } 

    addIngredientHandler=(type)=>{
        const oldCount =this.state.ingredient[type];
        const UpdatedCount = oldCount + 1;
        const updatedIngredient={
            ...this.state.ingredient
        }
        updatedIngredient[type] = UpdatedCount;
        const PriceAddition =INGREDIENT_PRICES[type];
        const oldPrice =this.state.totalPrice;
        const newPrice=oldPrice + PriceAddition;
        this.setState({totalPrice:newPrice , ingredient:updatedIngredient});
        this.updatePurchaseState(updatedIngredient);
    }

    removeIngredientHandler=(type)=>{
        //console.log("Type Of newPrice",this.state.totalPrice);
         const oldCount = this.state.ingredient[type];
        if(oldCount>0){
            const UpdatedCount =oldCount - 1;
            const UpdatedIngredient ={
                ...this.state.ingredient
            }
            UpdatedIngredient[type] =UpdatedCount;
            const PriceSubtraction = INGREDIENT_PRICES[type];
            const oldPrice=this.state.totalPrice;
            const newPrice =oldPrice-PriceSubtraction;
            this.setState({totalPrice:newPrice,ingredient:UpdatedIngredient});
            this.updatePurchaseState(UpdatedIngredient);
        }
    }

    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler=()=>{
        // alert("You continue!!!");
        const queryParams = [];
        for(let i in this.state.ingredient){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredient[i]));
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString=queryParams.join('&');
        //alert('queryString',queryString)
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+queryString
        });
        // this.setState({loading:true});
        // const order ={
        //     ingredient:this.state.ingredient,
        //     price:this.state.totalPrice,
        //     customer:{
        //         name:'Balaji',
        //         address:{
        //             Street:'Nanjappa nagar 1',
        //             pinCode:'641-602',
        //             country:'India'
        //         },  
        //     },
        //     deliveyMethod:'fastest',
        // }
        // axios.post('/orders.json',order)
        //     .then(response=>{
        //         //console.log(response);
        //         this.setState({loading:false, purchasing:false});
        //     })
        //     .catch(error=>{
        //         this.setState({loading:false, purchasing:false});
        //     });

    }

    render(){

        const disabledInfo ={
            ...this.state.ingredient
        }
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }

        let orderSummary=null;
        if(this.state.loading){
            orderSummary=<Spinner />;
        }

        let burger=this.state.error ? <p>Ingredient can't loaded!!</p> : <Spinner/>

        if(this.state.ingredient){
            burger=(
                <Aux>
                    <Burger ingredients={this.state.ingredient}/>
                        <BuildControls
                            ingredientAdded={this.addIngredientHandler} 
                            removeHandler={this.removeIngredientHandler}
                            disabled={disabledInfo}
                            purchaseable={this.state.purchaseable}
                            ordered={this.purchaseHandler}
                            price={this.state.totalPrice}/>
                </Aux>
            );
            orderSummary=<OrderSummary
                price={this.state.totalPrice} 
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}
                ingredient={this.state.ingredient} />;
        }
        //console.log(this.state.ingredient);
        return(
            <Aux>
                <Modal show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);
