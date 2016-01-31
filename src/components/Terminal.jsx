import React from 'react';
import Terminal from 'term.js';

// extern io

export default class ReactTerminal extends React.Component {
    componentDidMount() {
        var term = new Terminal({cols: 80, rows: 24});
        var socket = io(this.props.endpoint, {path: "/proxy/" + this.props.id + "/socket.io"});

        term.open(this.refs.target);
        term.on('data', (data) => {
            socket.emit('in', data);
        });
        socket.on('out', (data) => {
            term.write(data);
        });
    }

    render() {
        return <pre className="terminal" ref="target"></pre>;
    }
};
