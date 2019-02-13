import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import flv from 'flv.js';

import {fetchStream} from '../../actions';

class StreamShow extends Component {
    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();  
    }

    buildPlayer() {
        if (this.player || !this.props.stream) {
            return;
        }

        const {id} = this.props.match.params;

        this.player = flv.createPlayer({
            type:'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    renderText(){
        if(!this.props.stream) {
            return <div>Loading...</div>
        }

        const { title, description } = this.props.stream

        return (
            <Fragment>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </Fragment>
        );
    }

    render() {
        return (
            <div>
                <video ref={this.videoRef} style={{width: '100%'}} controls />
                {this.renderText()}
            </div>
        );
    }

    componentWillMount() {
        this.player.destroy();
    }
} 

const mapStateToProps = ({streams}, {match}) => {
    return { stream: streams[match.params.id] }
}

export default connect(mapStateToProps,{
    fetchStream
})(StreamShow);