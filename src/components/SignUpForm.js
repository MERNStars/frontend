import React, {Component} from 'react';

import simpleNumberLocalizer from 'react-widgets-simple-number';
import Multiselect from 'react-widgets/lib/Multiselect';
import { Combobox, NumberPicker, DropdownList, SelectList } from 'react-widgets'
import {Field, reduxForm} from 'redux-form';
import 'react-widgets/dist/css/react-widgets.css';
import {connect} from 'react-redux';

simpleNumberLocalizer();

function mapStateToProps(state){
    return {religions: state.userReducer.religions, sexes: state.userReducer.sexes, categories: state.eventReducer.event_categories}
}

class SignUpForm extends Component{

    renderTextField({input, label, type}){
        // console.log(input)
        return (
            <div className="Small-Text">
                <label>{label}</label> <br/>
                <input className="text-field" onChange={input.onChange} placeholder={label} type={type} />
            </div>
        )
    }

    renderAgeNumberPicker({input, name, label}){
     
        return (
            <div className="Small-Text">
                <label>{label}</label> <br/>
                <NumberPicker {...input} name={name} format="###" min={13} max={150} defaultValue={18} />
            </div>
        )
    }

    renderSexCombobox = ({input, name, label}) =>{
        const {sexes} = this.props;
        return (
            <div className="My-Radio"> 
                {label}: 
                <Combobox  {...input} name={name} data={sexes} defaultValue={sexes[0]} />
            </div>
        )
    }

    renderReligiousCombobox = ({input, name, label}) =>{
        const {religions} = this.props;
        return (
            <div className="My-Radio"> 
                {label}: 
                <Combobox {...input}  name={name} data={religions} defaultValue={religions[0]} />
            </div>
        )
    }

    renderInterestMultiSelects = ({input, name, label}) =>{
        const {categories} = this.props;
        return (
            <div className="My-Radio"> 
                {label}: 
                <Multiselect {...input} name={name} data={categories} onBlur={this.props.onBlur} defaultValue={[]} />
            </div>
        )
    }

    render(){
        return (
            <form onSubmit={this.props.handleSubmit} className="SignUpForm">
                <Field name="username" component={this.renderTextField} type="email" label="Email" />
                <Field name="password" component={this.renderTextField} type="password" label="Password" />
                <Field name="confirmPassword" component={this.renderTextField} type="password" label="Confirm Password" />
                <Field name="first_name" component={this.renderTextField} type="text" label="First Name" />
                <Field name="last_name" component={this.renderTextField} type="text" label="Last Name" />
                <Field name="age" component={this.renderAgeNumberPicker} label="Age" />
                <Field name="sex" component={this.renderSexCombobox} label="Sex" />
                <Field name="religion" component={this.renderReligiousCombobox} label="Religious affiliation:" />
                <Field name="interests" component={this.renderInterestMultiSelects} label="Event categories that might interest you" />
                <br/>
                <button className="btnSubmit" type="submit">Send</button>
            </form>
        );
    }
}

export default reduxForm({form: 'SignUpForm'})(connect(mapStateToProps)(SignUpForm));
