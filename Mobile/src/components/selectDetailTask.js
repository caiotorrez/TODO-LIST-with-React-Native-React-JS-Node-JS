import React, { useState } from 'react';
import { View, Text, Dimensions, DatePickerIOS, DatePickerAndroid } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Menu } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import 'moment/locale/pt-br';

const selectDetailTask = ({ task }) => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const today = new Date();
    moment.locale('pt-br');
    const nextTime = moment().add(1, 'h').format('ddd hh:mm A');
    const tomorrow = moment().subtract(today.getHours(), 'h').add(8, 'h').subtract(today.getMinutes(), 'm').add(1, 'day').format('ddd hh:mm A');



    showDatePicker = async (options) => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date(),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                a.add(8, 'h').format('ddd hh:mm A');
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    return (
        <>
            <View style={{ paddingTop: 10, paddingHorizontal: 10 }}>
                <Menu
                    style={{ width: Dimensions.get('window').width - 20 }}
                    visible={toggleMenu}
                    onDismiss={() => setToggleMenu(false)}
                    anchor={
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 20, borderWidth: 1, borderBottomWidth: 2, borderColor: '#ddd', backgroundColor: '#fff' }} onPress={() => setToggleMenu(!toggleMenu)}>
                            <MaterialIcons style={{ marginRight: 10 }} name="add-alarm" size={32} color="black" />
                            <Text style={{ fontSize: 18 }}>Lembrar-me</Text>
                        </TouchableOpacity>
                    }
                >
                    <Menu.Item icon="timer" onPress={() => { }} title={`Hoje (${nextTime})`} />
                    <Menu.Item icon="alarm" onPress={() => { }} title={`Amanhã (${tomorrow})`} />
                    <Menu.Item icon="note" onPress={() => showDatePicker()} title="Escolher data e hora" />
                </Menu>
            </View>
        </>
    )
}

export default selectDetailTask;
