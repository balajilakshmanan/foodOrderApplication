import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{

    state={
        order:[],
        loading:true
    }

    componentDidMount(){
        axios.get('orders.json')
            .then(res =>{
                //console.log(res.data);
                const fetchedData=[];
                for(let key in res.data){
                    fetchedData.push({
                        ...res.data[key],
                        id:key
                    });
                }
                this.setState({loading:false,order:fetchedData});
            })
            .catch(err=>{
                this.setState({loading:false});
            });
    }

    render(){
        return(
            <div>
                {this.state.order.map(order=>(
                    <Order key={order.id} 
                        ingredient={order.ingredient}
                        price={+order.price}/>
                ))}
            </div>
            // <div>
            //     <Order />
            // </div>
        );
    }
}


export default withErrorHandler(Orders,axios) ;