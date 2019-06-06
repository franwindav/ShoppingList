import React, {Component} from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Filters from './filters';
import Products from './products';
import reducers from './reducers';
import AddProduct from './AddProduct';

class Shop extends Component{
    constructor(props){
        super(props);
        this.state = {
            store: createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
        }
    }
    render(){
        return(
            <li className='list'>
                <Provider store={this.state.store}>
                    <Filters/>
                    <Products/>
                    <AddProduct/>
                </Provider>
            </li>
        );
    }
}

export default Shop;