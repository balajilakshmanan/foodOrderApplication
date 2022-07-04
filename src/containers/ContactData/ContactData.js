import React,{ Component } from 'react';
import Button from '../../components/UI/Modal/Button/Button';
import './ContactData.css';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Modal/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';

class ContactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            pincode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'PIN Code'
                },
                value:'',
                validation:{
                    required:true,
                    minlength:6,
                    maxlength:6
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'Cheapest',displayValue:'Cheapest'}
                    ]
                },
                validation:{},
                value:'fastest'
            }
        },
        formIsValid:false,
        loading:false
    }
    componentDidUpdate(){
        console.log("Pricess",this.props.price);
    }

    orderHandler=(event)=>{
        console.log("Uhfkuh",this.props.price);
        event.preventDefault();
        this.setState({loading:true});
        const formData={};
        for(let formEle in this.state.orderForm){
            formData[formEle]=this.state.orderForm[formEle].value
        }
        const order={
            ingredient:this.props.ingredients,
            price:this.props.price,
            orderData:formData
        }
        axios.post('/orders.json',order)
            .then(response=>{
                //console.log(response);
                this.setState({loading:false});
                this.props.history.push('/');
            })
            .catch(error=>{
                this.setState({loading:false});
            });
    }

    checkValidity=(value,rules)=>{
        let isValid=true;

        if(rules.required){
            isValid=value.trim() !=='' && isValid;
        } 

        if(rules.minlength){
            isValid=value.length>=rules.minlength  && isValid;
        }

        if(rules.maxlength){
            isValid=value.length<=rules.maxlength && isValid;
        }

        return isValid;

    }

    inputChangeHandler =(event,inputIdentifier)=>{
        //console.log(event.target.value);
        const updatedOrderForm={
            ...this.state.orderForm
        };

        const updatedOrderElement={
            ...updatedOrderForm[inputIdentifier]
        };

        updatedOrderElement.value=event.target.value;
        updatedOrderElement.valid=this.checkValidity(updatedOrderElement.value,updatedOrderElement.validation);
        updatedOrderElement.touched=true;
        updatedOrderForm[inputIdentifier]=updatedOrderElement;
        //console.log('CheckValidity',updatedOrderForm);

        let formIsvalid=true;
        for(let inputIdentifier in updatedOrderForm){
            formIsvalid=updatedOrderForm[inputIdentifier].valid && formIsvalid;
        }

        this.setState({orderForm:updatedOrderForm , formIsValid:formIsvalid});

    }

    render(){
        console.log("PROPS",this.props);
        const formElementsArray=[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }


        let form=(
            <form onSubmit={this.orderHandler}>
                    {formElementsArray.map(formElement=>(
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            changed={(event)=>this.inputChangeHandler(event,formElement.id)}
                            invalid={!formElement.config.valid}
                            touch={formElement.config.touched}
                            value={formElement.config.value}
                            />
                    ))}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                </form>
        );
        if(this.state.loading){
            form=<Spinner/>
        }
        return(
            <div className="ContactData">
                <h4>Enter your Details</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;