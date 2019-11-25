import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

var weekday = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
var yearMonth = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
var date = new Date();
var day = weekday[date.getDay()];
var month = yearMonth[date.getMonth()];

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(82, 91, 255, 0.7)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 15,
        color: '#fff'
    },
    title: {
        fontSize: 44,
        color: '#fff'
    },
    subTitle: {
        fontSize: 22,
        color: '#fff'
    }

});

const headerHome = () => {
    return (
        <>
            <ImageBackground source={{ uri: 'https://bit.ly/2VMafKZ' }} style={{ flex: 1 }} resizeMode='cover' />
            <View style={styles.container}>
                <Text style={styles.title}>Meu Dia</Text>
                <Text style={styles.subTitle}>{day}, {date.getDate()} de {month}</Text>
            </View>
        </>

    )
}

export default headerHome;
