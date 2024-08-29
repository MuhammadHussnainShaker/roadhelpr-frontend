import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {IP_ADDRESS} from './Constants';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(1);

  function incrementCount() {
    setCount(count + 1);
  }

  fetchData = async () => {
    try {
      const response = await axios.get(`${IP_ADDRESS}/api`);
      console.log(new Date().toLocaleTimeString(), ' ', response.data);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
      if (error.response) {
        console.log(
          'Server responded with a status code:',
          error.response.status,
        );
      } else if (error.request) {
        console.log(
          'Request was made but no response was received:',
          error.request,
        );
      } else {
        console.log('Error setting up the request:', error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [count]);

  return (
    <View style={styles.container}>
      <Text>Applet</Text>
      {todos && todos.length > 0 && (
        <Text>
          Congratulations..., you are successfully fetching data at{' '}
          {new Date().toLocaleTimeString()}
        </Text>
      )}
      {todos.map((todo, index) => (
        <View key={index}>
          <Text>{todo.name}</Text>
          <Text>{todo.id}</Text>
        </View>
      ))}
      <TouchableOpacity onPress={incrementCount}><Text>Refetch Data</Text></TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
