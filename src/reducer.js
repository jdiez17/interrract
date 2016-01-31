import {Map} from 'immutable';

function setState(state, newState) {
    return state.mergeDeep(newState);
}

export default function(state = Map(), action) {
    switch(action.type) {
    case 'SET_CONTAINER_STATE':
        return setState(state, action.state);
        break;
    }
}
