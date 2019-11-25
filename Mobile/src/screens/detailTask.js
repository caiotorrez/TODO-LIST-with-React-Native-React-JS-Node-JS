
import React, { useState } from 'react';
import { View, TextInput, SafeAreaView } from 'react-native';
import { Provider } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import SelectDetailTask from '../components/selectDetailTask';
import HeaderDetailTask from '../components/headerDetailTask';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { refreshTasks } from '../services/redux/action/task.action';

const detailTask = ({ navigation }) => {
    const dispatch = useDispatch();
    const [task, setTask] = useState(navigation.getParam('task', 'empty'));
    
    const teste = async () => {
        refreshTasks(dispatch);
        navigation.goBack();
    }

    return (
        <Provider>
            <KeyboardAwareScrollView extraHeight={210} enableOnAndroid={true}>
                <SafeAreaView style={{height: 80, justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => teste()}>
                        <Ionicons style={{ marginLeft: 20, marginTop: 20 }} name="md-arrow-back" size={32} ></Ionicons>
                    </TouchableOpacity>
                </SafeAreaView>
                <View style={{ flex: 1, backgroundColor: '#f7f7f7' }} >
                    <HeaderDetailTask task={task} setTask={setTask} navigation={navigation}/>
                    <SelectDetailTask/>
                    <View style={{ marginTop: 10, height: 150, marginHorizontal: 10, paddingTop: 10, borderWidth: 1, borderBottomWidth: 2, borderColor: '#ddd', backgroundColor: '#fff' }}>
                        <TextInput style={{ fontSize: 16, paddingHorizontal: 10 }} placeholder={"Adicionar uma anotação"}></TextInput>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </Provider>
    );
};

export default detailTask;