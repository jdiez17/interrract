import React from 'react';
import ReactDOM from 'react-dom';
import ReactTerminal from './components/Terminal';
import {RemoteContainerR} from './components/RemoteContainer';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducer';
import request from 'superagent';

import {setContainerState, setContainerID} from './action_creators';

const store = createStore(reducer);
store.dispatch(setContainerState('NONE'));

const masterrr_url = "http://localhost";
var proxy_base = null;

request.get(masterrr_url + "/start/").end((err, res) => {
    if(err || !res.ok) {
        console.log(err);
        store.dispatch(setContainerState('ERROR'));
        return;
    }
    console.log(res.body);

    var containerID = null;
    console.log("yep");
    if(res.body.hasOwnProperty('ContainerID')) {
        console.log("in");
        containerID = res.body.ContainerID;
        store.dispatch(setContainerState('STARTING'));
        store.dispatch(setContainerID(containerID));
    } else return;

    console.log("nope");

    var check = () => {
        request.get(masterrr_url + "/status/" + containerID).end((err, res) => {
            if(err || !res.ok) {
                console.log(err);
                return;
            }
            console.log(res.body);

            if(res.body.Status == 'READY') {
                store.dispatch(setContainerState('READY'));
                return;
            } else {
                setTimeout(check, 1000);
            }
        });
    }
    setTimeout(check, 1000);
});

ReactDOM.render(
    <Provider store={store}>
        <RemoteContainerR endpoint={masterrr_url} ready={false} />
    </Provider>,
    document.getElementById('app')
);

window.onbeforeunload = () => {
    if(containerID != null) {
        request.get(masterrr_url + "/stop/" + containerID);
    }
};
