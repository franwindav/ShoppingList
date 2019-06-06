import React, {Component} from 'react';
import Product from './Product';
import { connect } from 'react-redux';

const sortOrder = ['isDiscount', 'urgency', 'new'];

class Products extends Component{
    render(){
        let {data, filters} = this.props;
        let products = filters['price'] !== undefined ? data.filter((e)=>{return e['isDiscount'] ? e['priceDiscount'] >= filters['price'][0] && e['priceDiscount'] <= filters['price'][1] : e['price'] >= filters['price'][0] && e['price'] <= filters['price'][1]}) : data.slice();
        for (let i = 0; i < sortOrder.length; i++) {
            if(filters[sortOrder[i]] !== undefined && filters[sortOrder[i]].length) products = products.filter((e) => {
                for (let j = 0; j < filters[sortOrder[i]].length; j++) {
                    if(filters[sortOrder[i]][j] == e[sortOrder[i]]) return true;
                }
                return false;
            });
        }

        return(
            <ul id="products">
                {
                    products.map((e, i) => {return <Product key={i} info={e}/>})
                }
            </ul>
        );
    }
}

export default connect(
    state => ({
        data: state.products,
        filters: state.filterProducts,
    })
)(Products);