import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends Component {
    renderInput = ({input, label, meta}) => {
        const classNameField = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={classNameField}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderErrors(meta)}
            </div>
        );
    }

    renderErrors ({error, touched}) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    onSubmit(formValues) {
        //prevent default done by handle submit on redux form props passed to renderInput method
        console.log(formValues);
    }

    render() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Enter title" />
                <Field name="description" component={this.renderInput} label="Enter description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter a title'
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description'
    }

    return errors;
}

export default reduxForm({
    form: 'streamCreate',
    validate
})(StreamCreate);