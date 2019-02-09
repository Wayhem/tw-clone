import React, {Component} from 'react';
import { connect } from 'react-redux';

import { fetchStream } from '../../actions';

class StreamEdit extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderEdit() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        } else {
            return <div>{this.props.stream.title}</div>
        }
    }

    render() {
        return <div>{this.renderEdit()}</div>
    }
}

const mapStateToProps = ({streams}, {match}) => {
    return { stream: streams[match.params.id] }
}

export default connect(mapStateToProps, {
    fetchStream
})(StreamEdit);