export function setContainerState(state) {
    return {
        type: 'SET_CONTAINER_STATE', state: {
            'container': {
                'state': state
            }
        }
    };
}

export function setContainerID(id) {
    return {
        type: 'SET_CONTAINER_STATE', state: {
            'container': {
                'id': id
            }
        }
    };
}
