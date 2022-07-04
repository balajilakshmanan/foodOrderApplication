import React,{Component} from 'react';

import Aux from '../../../hoc/Aux';
import '../../UI/Modal/Modal.css';
import Backdrop from '../../../components/UI/Modal/Backdrop/Backdrop';

class Modal extends Component{

    shouldComponentUpdate (nextProps , nextState ){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate () {
        console.log('[Modal] update');
    }

    render(props){
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modelClosed}/>
                <div className="Modal"
                style={{
                    transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity :this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;