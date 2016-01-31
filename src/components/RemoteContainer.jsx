import ReactTerminal from './Terminal';
import Wait from './Wait';

import React from 'react';
import {connect} from 'react-redux';

export const RemoteContainer = React.createClass({
    render() { 
        return <div> 
            {this.props.container_state == 'READY' ? 
            <ReactTerminal endpoint={this.props.endpoint} id={this.props.id} /> :
            <Wait state={this.props.container_state} />}
       </div>;
    }
});

export const RemoteContainerR = connect((state) => {
    return {
        container_state: state.getIn(['container', 'state']),
        id: state.getIn(['container', 'id'])
    }
})(RemoteContainer);
