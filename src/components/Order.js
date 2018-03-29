import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {

    renderOrder = (id) => {
            const fish = this.props.fishes[id];
            const count = this.props.order[id];
            const isAvailable = fish && fish.status === 'available';

            //Make sure the fish is loaded before we continue
            if (!fish) return null;
            
            if (!isAvailable) {
                return <li key={id}>Sorry {fish ? fish.name : 'fish'} is no longer available</li>
            }
            return (
                <li key={id}>
                    {count} lbs {fish.name}
                    {formatPrice(count * fish.price)}
                </li>
            ) 
    }


    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prev, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];

            const isAvailable = fish && fish.status === 'available';
            if (isAvailable) {
                return prev + (fish.price * count);
            }
            return prev;

        }, 0)

        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <ul className="order">
                    {orderIds.map(this.renderOrder)}
                </ul>
                <div className="total">
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        )
    }
}

export default Order;