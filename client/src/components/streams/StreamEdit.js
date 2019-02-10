import React, {Component} from 'react';
import { connect } from 'react-redux';

import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    renderEdit() {
        if (this.props.isSignedIn === false) {
            //check log in
            return <h3>Log in first</h3>
        } else if (!this.props.stream || this.props.currentUserId === null) {
            //fetching data
            return <div>Loading...</div>
        } else if (this.props.stream.userId === this.props.currentUserId){
            //displaying
            const {title, description} = this.props.stream;
            return (
                <div>
                    <h3>Edit Stream</h3>
                    <StreamForm 
                        initialValues={{
                            title,
                            description
                        }}
                        onSubmit={this.onSubmit} 
                    />
                </div>
            );
        } else {
            return <h3>Cannot perform action.</h3>
        }
    }

    render() {
        return <div>{this.renderEdit()}</div>
    }
}

const mapStateToProps = ({streams, auth}, {match}) => {
    return { 
        stream: streams[match.params.id],
        currentUserId: auth.userId,
        isSignedIn: auth.isSignedIn
    }
}

export default connect(mapStateToProps, {
    fetchStream,
    editStream
})(StreamEdit);