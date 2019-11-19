import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { editTask } from '../services/redux/action/task.action';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: '#dedede'
    }
});

const taskThumbnail = React.memo(({ task, navigation }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.reducer);

    const toggleCompleted = (task) => {
        if (!loading) {
            task.completed = !task.completed;
            editTask(dispatch, task);
        }
    }

    const { title, completed } = task;

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { task: task })} style={styles.container}>
            <Text style={{ marginLeft: 40 }}>{title}</Text>
            <TouchableOpacity style={{ position: 'absolute', left: 0, paddingHorizontal: 20 }} onPress={() => toggleCompleted(task)}>
                <Ionicons name={completed ? 'ios-checkmark-circle' : 'ios-radio-button-off'} size={32} color="#525bff" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
});

export default taskThumbnail;
