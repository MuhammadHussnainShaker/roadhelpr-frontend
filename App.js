import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {IP_ADDRESS} from './Constants.js';

const App = () => {
  const [todos, setTodos] = useState([]);

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
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.heading}>Sign up</Text>
        <TextInput
          style={styles.nameInput}
          placeholder="Full Name"
          placeholderTextColor="#B0B0B0"
        />
        <TextInput
          style={styles.emailInput}
          placeholder="Email Address"
          placeholderTextColor="#B0B0B0"
        />
        <TextInput
          style={styles.pwInput}
          placeholder="Password"
          placeholderTextColor="#B0B0B0"
        />
        <TouchableOpacity style={styles.continueBtn}>
          <Text>Continue</Text>
        </TouchableOpacity>
        <View style={styles.loginLink}>
          <Text style={styles.loginTxt}>Already have an account?</Text>
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginBtnTxt}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    // backgroundColor: '#878276',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  subContainer: {
    width: '94%',
    paddingTop: 16,
    paddingBottom: 28,
  },
  heading: {
    color: '#E0E0E0',
    fontSize: 28,
    fontWeight: '600',
  },
  nameInput: {
    marginTop: 24,
    borderBottomWidth: 1,
    borderColor: '#2C2C2C',
    fontWeight: '600',
  },
  emailInput: {
    marginTop: 12,
    borderBottomWidth: 1,
    borderColor: '#2C2C2C',
    fontWeight: '600',
  },
  pwInput: {
    marginTop: 12,
    borderBottomWidth: 1,
    borderColor: '#2C2C2C',
    fontWeight: '600',
  },
  continueBtn: {
    marginTop: 24,
    backgroundColor: '#1A5319',
    padding: 12,
    alignItems: 'center',
  },

  loginLink: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginTxt: {
    color: '#E0E0E0',
  },
  loginBtnTxt: {
    color: '#4CAF50',
  },
});
