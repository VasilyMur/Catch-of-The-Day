//import React, { Fragment } from 'react';
import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    // constructor() {
    //     super();
    //     this.goToStore = this.goToStore.bind(this);
    // }

    // Property 1 on component StorePicker
    myInput = React.createRef();

    // Property 2 on components StorePicker - Declare Method goToStore()
    // goToStore(e) {
    //     e.preventDefault();
    //     console.log(this.myInput.current.defaultValue) 
    // }

    // Set Property rather than declare Method!!! not to use bind in constructor!!!
    goToStore = (e) => {
        e.preventDefault();
        console.log(this.myInput.current.defaultValue) 
    }

    render() {
        return (
            <React.Fragment>
                { /* comment */ }
                <form className="store-selector" onSubmit={this.goToStore}>
                    <h2>Please Enter a Store</h2>
                    <input ref={this.myInput} type="text" required placeholder="Store Name"defaultValue={getFunName()}/>
                    <button type="submit">Visit Store</button>
                </form>
            </React.Fragment>
        )
    }
}

export default StorePicker;