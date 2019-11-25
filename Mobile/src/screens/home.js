import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { loadTasks, refreshTasks } from '../services/redux/action/task.action';
import TaskThumbnail from '../components/taskThumbnail';
import HeaderHome from '../components/headerHome';

export const Home = React.memo(({ navigation }) => {
  const dispatch = useDispatch();
  const { tasks, loading, refreshLoading, limitExceeded } = useSelector(state => state.reducer);

  const loadMore = () => {
    if (!limitExceeded) {
      params = [`offset=${tasks.length}`, `limit=${tasks.length + 10}`]
      loadTasks(dispatch, params);
    }
  }

  const loadMoreLoading = () => {
    if (!limitExceeded) {
      return (
        <View>
          <ActivityIndicator style={{ paddingVertical: 15 }}></ActivityIndicator>
        </View>
      )
    } else {
      return (
        <View></View>
      )
    }
  }

  useEffect(() => {
    if (!loading) {
      loadTasks(dispatch);
    }
  }, []);

  return (

    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white', }} behavior="padding" enabled keyboardVerticalOffset={0}>
      <View style={{ flex: 1 }}>
        <HeaderHome></HeaderHome>
      </View>

      <View style={{ flex: 2, justifyContent: 'space-between' }}>
        <ScrollView alwaysBounceVertical={true} contentContainerStyle={{ flex: 1 }} style={{ flex: 1, marginTop: 10, marginBottom: 50 }}>
          {tasks.length ?
            <FlatList
              style={{ flex: 1 }}
              data={tasks}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (<TaskThumbnail navigation={navigation} task={item}></TaskThumbnail>)}
              onEndReached={() => loadMore()}
              onEndReachedThreshold={0.05}
              ListFooterComponent={() => loadMoreLoading()}
              refreshing={refreshLoading}
              onRefresh={() => refreshTasks(dispatch)}
            />
            : <View>
              {loading ? <Text style={{ fontSize: 18, textAlign: 'center' }}>Carregando...</Text> :
                <Text style={{ fontSize: 18, textAlign: 'center' }}>Sua lista está vazia. Adicione uma tarefa pendente.</Text>}
            </View>
          }
        </ScrollView>

        <View style={styles.addtaskContainer}>
          <TouchableOpacity style={styles.addtaskTouchable} onPress={() => { navigation.navigate('NewTask') }}>
            <Ionicons name="ios-add" size={32} color="#525bff" />
            <Text style={{ paddingLeft: 10, color: '#525bff' }}>Add Tarefa</Text>
          </TouchableOpacity >
        </View>
      </View>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  addtaskContainer: {
    height: 50,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    width: '100%'
  },
  addtaskTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#dedede'
  }
});

export default Home;