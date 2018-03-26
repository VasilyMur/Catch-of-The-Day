import React from 'react';

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

    componentDidMount() {
        this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
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
                <Order fishes={this.state.fishes} order={this.state.order}/>
                <Inventory 
                    loadSampleFishes={this.loadSampleFishes}
                    addFish={this.addFish}
                    />
            </div>
        )
    }
}


export default App;