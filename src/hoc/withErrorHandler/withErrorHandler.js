import React,{Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComponent ,axios) =>{
     return class extends Component{
 
        state={
            error:null,
            reqInterceptor:null,
            resInterceptor:null,
        }
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req=>{
                this.setState({error:null});
                console.log(req);
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res,error=>{
                this.setState({error:error});
                console.log(error);
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler=()=>{
            this.setState({error:null});
        }
        render(props){
            return(
                <Aux>
                    <Modal 
                    show={this.state.error} 
                    modelClosed={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent  {...this.props}/>
                </Aux>
                );
        }
    }
}

export default withErrorHandler;