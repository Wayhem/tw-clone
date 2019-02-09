import React, {Component} from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends Component {
    onSubmit = (formValues) => {
        //prevent default done by handle submit on redux form props passed to renderInput method
        this.props.createStream(formValues);
    }

    render() {
        return (
            <div>
                <h3>Create Stream</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

export default connect(null, {
    createStream
})(StreamCreate);