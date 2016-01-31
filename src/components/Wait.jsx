import React from 'react';

export default class Wait extends React.Component {

    render() {
        return <pre>Your thingy is loading. The state is: {this.props.state}</pre>;
    }
};
