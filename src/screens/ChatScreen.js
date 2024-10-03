import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    TextInput,
    Button,
    Text,
    FlatList,
    SafeAreaView,
} from 'react-native'
import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ChatScreen = ({ route }) => {
    const { serviceRequestId, userId, userType } = route.params // Assuming you pass these as route params
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const socket = useRef(null)

    // Connect to the backend server when the component mounts
    useEffect(() => {
        const initSocket = async () => {
            const accessToken = await AsyncStorage.getItem('accessToken')

            socket.current = io('http://your-server-url:3000', {
                auth: {
                    token: accessToken, // Pass token for authentication
                },
            })

            // Join the chat room based on service request ID
            socket.current.emit('joinRoom', { serviceRequestId })

            // Listen for new messages
            socket.current.on('receiveMessage', (newMessage) => {
                setMessages((prevMessages) => [...prevMessages, newMessage])
            })

            // Clean up connection on component unmount
            return () => {
                socket.current.disconnect()
            }
        }

        initSocket()
    }, [serviceRequestId])

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            // Emit the message to the backend
            socket.current.emit('sendMessage', {
                serviceRequestId,
                sender: userId,
                message,
            })

            // Optionally append the message to the local state
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: userId, message, time: new Date() },
            ])
            setMessage('') // Clear the input field
        }
    }

    // Render each message in a simple FlatList
    const renderMessage = ({ item }) => (
        <View
            style={{
                padding: 10,
                backgroundColor: item.sender === userId ? '#e1ffc7' : '#f0f0f0',
                marginVertical: 5,
            }}
        >
            <Text>
                {item.sender === userId ? 'You' : 'Other'}: {item.message}
            </Text>
            <Text style={{ fontSize: 10 }}>
                {new Date(item.time).toLocaleTimeString()}
            </Text>
        </View>
    )

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item, index) => index.toString()}
                inverted // Show the latest message at the bottom
            />
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type your message"
                    style={{
                        flex: 1,
                        borderColor: '#ccc',
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 10,
                    }}
                />
                <Button title="Send" onPress={handleSendMessage} />
            </View>
        </SafeAreaView>
    )
}

export default ChatScreen
