import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { editTask } from '../services/redux/action/task.action';

const taskThumbnail = React.memo(({ task, navigation }) => {
    const { title, completed } = task;
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.reducer);
    
    const toggleCompleted = (task) => {
        if (!loading) {
            task.completed = !task.completed;
            editTask(dispatch, task);
        }
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate('DetailTask', { task: task })} style={styles.container}>
            <Text style={{ marginLeft: 40 }}>{title}</Text>
            <TouchableOpacity style={styles.touched} onPress={() => toggleCompleted(task)}>
                <Ionicons name={completed ? 'ios-checkmark-circle' : 'ios-radio-button-off'} size={32} color="#525bff" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: '#dedede'
    },
    touched: {
        position: 'absolute',
        left: 0,
        paddingHorizontal: 20
    }
});

export default taskThumbnail;
