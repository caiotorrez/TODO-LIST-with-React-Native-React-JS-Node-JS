import { AsyncStorage } from 'react-native';
import conection from '../../conection';
import constants from '../../constants';

export const loadTasks = async (dispatch, params = []) => {
    await AsyncStorage.setItem('@jwt', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTc0MDc3NzIyLCJleHAiOjE2NzQwNzc3MjJ9.Yu5XV7Rv1yrzC2rodZoNfQiVMTyCgxIqg95kq9TZq88');
    params = [...params, 'startDate=2019-11-04']
    dispatch({ type: "LOADING_TASK" });
    await conection.get('task', params).then(
        (data) => {
            console.log('data -> ', data.length)
            if (!data.length) {
                dispatch({ type: "LIMIT_EXCEEDED" });
            }
            else {
                dispatch({ type: constants.actions.task.findAll, payload: data });
            }
        },
        (error) => {
            console.error(error);
            dispatch({ type: "GET_TASKS_ERROR" });
        }
    );
}

export const refreshTasks = async (dispatch, params = []) => {
    params = [...params, 'startDate=2019-11-04']
    dispatch({ type: "LOADING_REFRESH_TASK" });
    await conection.get('task', params).then(
        (data) => {
            dispatch({ type: 'REFRESH_TASK', payload: data });
        },
        (error) => {
            console.error(error);
            dispatch({ type: "GET_TASKS_ERROR" });
        }
    );
}

export const addTask = async (dispatch, task) => {
    if (task) {
        dispatch({ type: "LOADING_TASK" });
        await conection.post('task', task).then(
            (task) => {
                dispatch({ type: constants.actions.task.addTask, payload: task });
            },
            (error) => {
                alert(error);
                dispatch({ type: "GET_TASKS_ERROR" });
            }
        );
    }
}

export const editTask = async (dispatch, task) => {
    const { id } = task;
    if (id) {
        dispatch({ type: "LOADING_TASK" });
        await conection.put(`task/${id}`, task).then(
            () => {
                dispatch({ type: constants.actions.task.editTask, payload: task });
            },
            (error) => {
                console.error(error);
                dispatch({ type: "GET_TASKS_ERROR" });
            }
        );
    }
}