import React from 'react';
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {

    renderOrder = (id) => {
            const fish = this.props.fishes[id];
            const count = this.props.order[id];
            const isAvailable = fish && fish.status === 'available';

            //Make sure the fish is loaded before we continue
            if (!fish) return null;
            
            if (!isAvailable) { 
                return (
                    <CSSTransition 
                    classNames="order"
                    key={id}
                    timeout={{ enter: 500, exit: 500 }}
                    >
                        <li key={id}>
                            Sorry {fish ? fish.name : 'fish'} is no longer available
                        </li>
                    </CSSTransition>
                )
            }
            return (
                <CSSTransition 
                    classNames="order"
                    key={id}
                    timeout={{ enter: 500, exit: 500 }}
                > 
                    <li key={id}>
                        <span>
                            <TransitionGroup component="span" className="count">
                                <CSSTransition classNames="count" key={count} timeout={{ enter:5000, exit: 5000 }}>
                                    <span>{count}</span>
                                </CSSTransition>
                            </TransitionGroup>
                            lbs {fish.name}
                            {formatPrice(count * fish.price)}
                            <button onClick={() => {this.props.removeFromOrder(id)}}>&times;</button>
                        </span>
                    </li>
                </CSSTransition>
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
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        )
    }
}

export default Order;