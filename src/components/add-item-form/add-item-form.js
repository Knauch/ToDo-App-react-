import React, { Component } from "react";
import './add-item-form.css';

export default class ItemAddForm extends Component {
    
    state = {
        label: ''
    };

    onLabelChange = (e) => {
        this.setState ( {label: e.target.value});
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label);
        this.setState({
            label: ''
        });
    };

    render() {
        return (
            <form className="add-item-form d-flex"
                  onSubmit={this.onSubmit}>
                <input type="text"
                       className="form-control"
                       onChange={this.onLabelChange}
                       placeholder="Type New Task Here"
                       value={this.state.label}
                       />

                <button className="btn btn-outline-secondary"
                
                >Add Item</button>
            </form> 
        )

    };

};
