import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Modal from '../Modal';
import history from '../../history';
import {fetchStream, deleteStream} from '../../actions';

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions() {
        return (
            <Fragment>
                <button onClick={() => this.props.deleteStream(this.props.match.params.id)} className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </Fragment>
        );
    }

    renderAuth() {
        if(this.props.auth.isSignedIn === null || !this.props.stream) {
            return <h3>Loading...</h3>  
        } else if (!this.props.auth.isSignedIn) {
            return <h3>Log in to proceed.</h3>
        } else if(this.props.auth.userId !== this.props.stream.userId) {
            return <h3>You are not allowed to do that.</h3>
        }
        return (
            <div>
                <Modal 
                    header="Delete Stream"
                    content={`Are you sure you want to delete this stream with title: ${this.props.stream.title}?`}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
            </div>
        );
    }

    render() {
        return <div>{this.renderAuth()}</div>
    }
}

const mapStateToProps = ({auth, streams}, {match}) => {
    return { 
        auth, 
        stream: streams[match.params.id]
    }
}

export default connect(mapStateToProps, {
    fetchStream,
    deleteStream
})(StreamDelete);