const initialState = {
    tasks: [],
    newTasks: [],
    limitExceeded: false,
    error: null,
    loading: false,
    refreshLoading: false
}

export function reducer(state = initialState, { type, payload }) {

    switch (type) {
        case 'LOADING_TASK':
            return {
                ...state,
                loading: true
            }
        case 'LOADING_REFRESH_TASK':
            return {
                ...state,
                refreshLoading: true,
            }
        case 'LIMIT_EXCEEDED':
            return {
                ...state,
                loading: false,
                limitExceeded: true
            }
        case 'FIND_ALL_TASKS':
            return {
                ...state,
                tasks: [...state.tasks, ...payload],
                loading: false
            }
        case 'REFRESH_TASK':
            return {
                ...state,
                tasks: [...payload],
                refreshLoading: false,
                limitExceeded: false
            }
        case 'ADD_TASK':
            return {
                ...state,
                newTasks: [...state.newTasks, payload],
                loading: false
            }
        case 'EDIT_TASK':
            return {
                ...state,
                loading: false
            }
        case 'REMOVE_TASK':
            return {
                ...state,
                tasks: newAllTasks,
                loading: false
            }
        case 'ERROR_TASK': {
            return {
                ...state,
                loading: false,
                refreshLoading: false
            }
        }
        default:
            return state;
    }
}