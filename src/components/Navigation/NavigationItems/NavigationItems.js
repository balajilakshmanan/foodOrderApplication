import React ,{Component} from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';
class NavigationItems extends Component{
    // constructor(props){
    //     super(props);
    // }
    state={
        burger:false,
        order:false
    }

    // clicked=(props)=>{
    //     alert("esg");
    //     if(props===1){
    //         this.setState({burger:true,order:false});
    //     }
    //     else{
    //         this.setState({burger:false,order:true});
    //     }
    // }

    render(){
        // let style='%%',b='%%';
        // if(this.state.burger){
        //     style='test';
        //     b=''
        // }
        // if(this.state.order){
        //     style='';
        //     b='test'
        // }
        // console.log("style",this.state.burger);
        // console.log("b",this.state.order);
        return(
            <ul className="NavigationItems">
                <NavigationItem link="/" style={{height:this.props.height}} act={this.state.burger} onClick={()=>this.clicked(1)}>Burger Builder</NavigationItem>
                <NavigationItem link="/orders" style={{height:this.props.height}} act={this.state.order} onClick={()=>this.clicked(2)} >Orders</NavigationItem>
            </ul>
        );
    };
} 

export default NavigationItems;