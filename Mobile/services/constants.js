
export default constants = {
    path : {
        host:  'http://192.168.0.18:3000',
        signin: '/signin',
        task: {
            get: '',
            post: '',
            getAll: '',
            delete: ''
        }
    },

    actions: {
        task: {
            findAll: 'FIND_ALL_TASKS',
            addTask: 'ADD_TASK',
            editTask: 'EDIT_TASK'
        }
    }
}