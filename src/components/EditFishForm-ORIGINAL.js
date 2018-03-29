import React from 'react';

class EditFishForm extends React.Component {
    
    handleChange = (e) => {
        console.log(e.currentTarget.name);

        const updatedFish = {
            ...this.props.fish,
            [e.currentTarget.name]: e.currentTarget.value
        }

        this.props.updateFish(this.props.index, updatedFish);

    }


    render() {
        return (
            <div className="fish-edit">
                <input ref={this.nameRef} type="text" name="name" onChange={this.handleChange} value={this.props.fish.name}/> 
                <input ref={this.priceRef} type="text" name="price" onChange={this.handleChange} value={this.props.fish.price}/> 
                <select ref={this.statusRef} type="text" name="status" onChange={this.handleChange} value={this.props.fish.status}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea ref={this.descRef} name="desc"onChange={this.handleChange} value={this.props.fish.desc}/> 
                <input ref={this.imageRef} type="text" name="image" onChange={this.handleChange} value={this.props.fish.image}/>
            </div>
        )
    }
}

export default EditFishForm;