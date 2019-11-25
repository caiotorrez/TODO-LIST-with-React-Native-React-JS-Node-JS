import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { editTask } from '../services/redux/action/task.action';

const headerDetailTask = ({ task, setTask, navigation }) => {
    const dispatch = useDispatch();
    const { title, completed, active } = task;

    const toggleCompleted = () => {
        setTask({ ...task, completed: !task.completed });
        task.completed = !task.completed;
        editTask(dispatch, task);
    }

    const toggleActive = () => {
        setTask({ ...task, active: !task.active });
        task.active = !task.active;
        editTask(dispatch, task);
    }
    
    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => toggleCompleted()}>
                    <Ionicons style={{ paddingBottom: 10 }}
                        name={completed ? 'ios-checkmark-circle' : 'ios-radio-button-off'}
                        size={32}
                        color={completed ? '#525bff' : '#000'} />
                </TouchableOpacity>
                <Text style={styles.titleTask}>{title}</Text>
            </View>

            <View style={{ paddingTop: 10, paddingHorizontal: 10 }}>
                <TouchableOpacity style={styles.activeContainer}
                    onPress={() => toggleActive()}>
                    <MaterialCommunityIcons style={{ marginRight: 10 }} name="weather-sunny" size={32} color={active ? '#525bff' : '#000'} />
                    <Text style={{ fontSize: 18, color: active ? '#525bff' : '#000' }}>{active ? 'Adicionada a Meu Dia!' : 'Adicionar a Meu Dia'}</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff'
    },
    titleTask: {
        fontSize: 26,
        marginLeft: 15,
        paddingBottom: 15
    },
    activeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderWidth: 1,
        borderBottomWidth: 2,
        borderColor: '#ddd',
        backgroundColor: '#fff'
    }
});

export default headerDetailTask;
