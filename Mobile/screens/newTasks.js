import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, StyleSheet, ScrollView, FlatList, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../services/redux/action/task.action';
import Task from '../models/task';
import TaskThumbnail from '../components/taskThumbnail';

const styles = StyleSheet.create({
    keyboardAvoid: {
        flex: 1,
        backgroundColor: 'white'
    },
    listContainer: {
        flex: 2,
        justifyContent: 'space-between'
    },
    listTask: {
        marginTop: 10,
        marginHorizontal: 20,
        marginBottom: 60
    },
    inputContainer: {
        height: 50,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        width: '100%',
        borderTopColor: '#ddd',
        borderTopWidth: 1
    },
    iconTouched: {
        height: 32,
        position: 'absolute',
        left: 20,
        top: 8
    }
});

const newTasks = ({ navigation }) => {
    const dispatch = useDispatch();
    const { newTasks, loading } = useSelector(state => state.reducer);
    const [task, setTask] = useState(new Task());
    const toggleCompleted = () => {
        setTask({ ...task, completed: !task.completed });
    }
    const createTask = () => {
        if (task.title) {
            addTask(dispatch, task);
        }
        setTask(new Task());
    }


    useEffect(() => {
        setTimeout(() => {
            this.focusInput.focus();
        }, 400);
    }, [newTasks.length]);

    return (
        <KeyboardAvoidingView style={styles.keyboardAvoid} behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 80}>
            <View style={styles.listContainer}>
                <SafeAreaView>
                    <ScrollView style={styles.listTask}>
                        {newTasks.length > 0 &&
                            <FlatList
                                data={newTasks}
                                keyExtractor={(item) => String(item.id)}
                                renderItem={({ item }) => (<TaskThumbnail navigation={navigation} task={item}></TaskThumbnail>)}
                            />
                        }
                    </ScrollView>
                </SafeAreaView>

                <View style={styles.inputContainer}>
                    <TextInput
                        ref={(input) => { this.focusInput = input; }}
                        value={task.title}
                        placeholder="Adicionar nova tarefa"
                        onSubmitEditing={() => createTask()}
                        onChangeText={(text) => setTask({ title: text })}
                        style={{ flex: 1, padding: 10, height: 20, marginLeft: 50 }}>
                    </TextInput>
                    <TouchableOpacity style={styles.iconTouched} onPress={() => toggleCompleted()}>
                        <Ionicons name={task.completed ? 'ios-checkmark-circle' : 'ios-radio-button-off'} size={32} color="#525bff" />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default newTasks;
