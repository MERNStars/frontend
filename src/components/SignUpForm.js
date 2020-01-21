import React, {Component, input} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

function mapStateToProps(state){
    return {religions: state.userReducer.religions, sexes: state.userReducer.sexes, categories: state.eventReducer.event_categories}
}

class SignUpForm extends Component{
    renderTextField({input, label, type}){
        return (
            <div className="Small-Text">
                <label>{label}</label> <br/>
                <input className="text-field" placeholder={label} type={type} />
            </div>
        )
    }

    renderRadioField({input, label, type}){
        return (
            <div className="My-Radio"> 
                <input className="radio-field" name="sex" type={type} value={label}/>{label}
            </div>
        )
    }

    renderCheckboxField({input, label, type, name}){
        return (
            <div className="My-Checkbox">
                <input className={name} id={name} type={type} value={label}/>{label} 
            </div>
        )
    }

    render(){
        const {sexes, categories} = this.props;
        let sexesRadios = sexes.map((sex, key) => {
            return <Field name="sex" key={key} component={this.renderRadioField} type="radio" label={sex} />
        });

        let interestCheckbox = categories.map((option, key) => {
            return <Field name="interests" key={key} component={this.renderCheckboxField} type="checkbox" label={option}  value={option} />
        });

        return (
            <form onSubmit={this.props.handleSubmit} className="ContactForm">
                <Field name="username" component={this.renderTextField} type="email" label="Email" />
                <Field name="password" component={this.renderTextField} type="password" label="Password" />
                <Field name="confirmPassword" component={this.renderTextField} type="password" label="Confirm Password" />
                <Field name="first_name" component={this.renderTextField} type="text" label="First Name" />
                <Field name="last_name" component={this.renderTextField} type="text" label="Last Name" />
                <Field name="age" component={this.renderTextField} type="number" label="Age" />
                {sexesRadios}
                {interestCheckbox}
                <button className="btnSubmit" type="submit">Send</button>
            </form>
        );
    }
}

export default reduxForm({form: 'user-signup-form'})(connect(mapStateToProps)(SignUpForm));
