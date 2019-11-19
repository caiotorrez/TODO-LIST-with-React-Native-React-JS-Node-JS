// Example.js
import React, { useEffect } from 'react';
import { View, Text, ImageBackground, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { loadTasks } from './services/redux/action/task.action';
import TaskThumbnail from './components/taskThumbnail';

var weekday = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
var yearMonth = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
var date = new Date();
var day = weekday[date.getDay()];
var month = yearMonth[date.getMonth()];

const Home = React.memo(({ navigation }) => {

  const dispatch = useDispatch();
  var { tasks, loading } = useSelector(state => state.reducer);

  useEffect(() => {
    if (!loading) {
      loadTasks(dispatch);
    }
  }, []);

  return (

    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white', }} behavior="padding" enabled keyboardVerticalOffset={0}>

      <View style={{ flex: 1 }}>
        <ImageBackground source={{ uri: 'https://bit.ly/2VMafKZ' }}
          style={{ flex: 1 }}
          resizeMode='cover'>
        </ImageBackground>
        <View style={{ backgroundColor: 'rgba(82, 91, 255, 0.7)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end', paddingHorizontal: 20, paddingBottom: 15 }}>
          <Text style={{ fontSize: 44, color: '#fff' }}>Meu Dia</Text>
          <Text style={{ fontSize: 22, color: '#fff' }}>{day}, {date.getDate()} de {month}</Text>
        </View>
      </View>

      <View style={{ flex: 2, justifyContent: 'space-between' }}>
        <SafeAreaView>
          <ScrollView style={{ marginTop: 10 }}>
            {tasks.length ?
              <View>
                {tasks.map((task, index) => {
                  return (
                    <TaskThumbnail key={index} navigation={navigation} task={task}></TaskThumbnail>
                  )
                })}
              </View>
              : <View>
                {loading ? <Text style={{ fontSize: 18, textAlign: 'center' }}>Carregando...</Text> :
                  <Text style={{ fontSize: 18, textAlign: 'center' }}>Sua lista está vazia. Adicione uma tarefa pendente.</Text>}
              </View>

            }
          </ScrollView>
        </SafeAreaView>

        <View style={{ height: 50, position: 'absolute', bottom: 0, backgroundColor: '#fff', width: '100%' }}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#dedede' }}
            onPress={() => { navigation.navigate('NewTask') }}>
            <Ionicons name="ios-add" size={32} color="#525bff" />
            <Text style={{ paddingLeft: 10, color: '#525bff' }}>Add Tarefa</Text>
          </TouchableOpacity >
        </View>
      </View>
    </KeyboardAvoidingView>
  );
});

export default Home;