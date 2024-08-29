import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IP_ADDRESS } from './Constants.js'

const App = () => {
  const [todos, setTodos] = useState([])

  fetchData = async () => {
    try {
      const response = await axios.get(`${IP_ADDRESS}/api`)
      console.log(new Date().toLocaleTimeString(), ' ', response.data)
      setTodos(response.data)
    } catch (error) {
      console.error('Error fetching data: ', error)
      if (error.response) {
        console.log(
          'Server responded with a status code:',
          error.response.status
        )
      } else if (error.request) {
        console.log(
          'Request was made but no response was received:',
          error.request
        )
      } else {
        console.log('Error setting up the request:', error.message)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <Text>RoadHelpr</Text>
      {todos && todos.length > 0 && (
        <Text>
          Congratulations..., you are successfully fetched data at{' '}
          {new Date().toLocaleTimeString()}
        </Text>
      )}
      {todos.map((todo, index) => (
        <View key={index}>
          <Text>
            {todo.id} - {todo.name}
          </Text>
        </View>
      ))}
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
})
