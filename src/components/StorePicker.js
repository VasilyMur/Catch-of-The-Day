//import React, { Fragment } from 'react';
import React from 'react';

class StorePicker extends React.Component {
    render() {
        return (
            <React.Fragment>
                { /* comment */ }
                <from className="store-selector">
                    <h2>Please Enter a Store</h2>
                    <input type="text" required placeholder="Store Name"/>
                    <button type="submit">Visit Store</button>
                </from>
            </React.Fragment>
        )
    }
}

export default StorePicker;