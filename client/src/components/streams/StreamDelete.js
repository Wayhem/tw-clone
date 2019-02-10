import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import Modal from '../Modal';
import history from '../../history';
import {fetchStream} from '../../actions';

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }
    render() {
        const actions = (
            <Fragment>
                <button className="ui button negative">Delete</button>
                <button className="ui button">Cancel</button>
            </Fragment>
        );
        if(this.props.auth.isSignedIn === null || this.props.stream === null) {
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
                    content="Are you sure you want to delete this stream?"
                    actions={actions}
                    onDismiss={() => history.push('/')}
                />
            </div>
        );
    }
}

const mapStateToProps = ({auth, streams}, {match}) => {
    return { 
        auth, 
        stream: streams[match.params.id]
    }
}

export default connect(mapStateToProps, {
    fetchStream
})(StreamDelete);