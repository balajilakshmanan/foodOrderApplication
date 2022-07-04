import React , {Component} from 'react';
import Layout from './components/Navigation/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/BurgerBuilder/Checkout/Checkout';
import {Route,Switch} from 'react-router-dom';
import  Orders from './containers/Orders/Orders';

class App extends Component{


  // componentDidMount(){
  //   setTimeout(()=>{
  //       this.setState({show:false});
  //   },5000);
  // }


  render(){
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/" exact component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}


// function App() {
//   return (
//     <div>
//       <Layout>
//         <BurgerBuilder/>
//       </Layout>
//     </div>
//   );
// }

export default App;
