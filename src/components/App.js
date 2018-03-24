import React from 'react';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';

class App extends React.Component {

    //Set State
    state = {
        fishes: {},
        order: {}
    }

    addFish = (fish) => {
        // Update State 
        // 1. Take a copy of the existing state
        const fishes = {...this.state.fishes}

        // 2. Add our new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;
        console.log('Adding a Fish')

        // 3. Set the new fishes object to State
        this.setState({
            fishes: fishes
        })
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                </div>
                <Order />
                <Inventory addFish={this.addFish}/>
            </div>
        )
    }
}


export default App;