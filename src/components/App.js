import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {

    //Set State
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object,
    }


    componentDidMount() {
        // 1. Reinstate Local Storage
        const localStorageRef = localStorage.getItem(this.props.match.params.storeId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }

        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }  

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        // Update State 
        // 1. Take a copy of the existing state
        const fishes = {...this.state.fishes}

        // 2. Add our new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;

        // 3. Set the new fishes object to State
        this.setState({
            fishes: fishes
        })
    }

    updateFish = (key, updatedFish) => {
        // 1. Take a copy of the current state
        const fishes = {...this.state.fishes};
        // 2. Update that state
        fishes[key] = updatedFish;
        // 3. Set that to state
        this.setState({ fishes: fishes });
    }

    deleteFish = (key) => {
        // 1. Take a of the current state
        const fishes = {...this.state.fishes};
        // 2. Update that state -->> delete fishes[key] - doesnt work for Firebase. Firebase wants to set it to NULL instead!!
        fishes[key] = null;
        // 3. Set that to state
        this.setState({ fishes: fishes });
    }

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        })
    }

    addToOrder = (key) => {

        // 1. Take a copy of state
        const order = {...this.state.order};

        // 2. Either add to the order or update the number in our order
        order[key] = order[key] + 1 || 1; 
 
        // 3. Call Setstate to update our State object
        this.setState({ 
            order: order
        })
    }

    removeFromOrder = (key) => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({ order: order });
    }
    
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="fishes">

                        {Object.keys(this.state.fishes).map(key => {
                            return <Fish 
                                key={key} 
                                index={key}
                                details={this.state.fishes[key]} 
                                addToOrder={this.addToOrder}
                            />
                        })}

                    </ul>
                  
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                    />
                <Inventory 
                    loadSampleFishes={this.loadSampleFishes}
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId}
                    />
            </div>
        )
    }
}


export default App;