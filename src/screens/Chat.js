import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    TextInput,
    Text,
    FlatList,
    SafeAreaView,
    StyleSheet,
} from 'react-native'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'
import { Icons } from '../constants/icons'
import { COLORS } from '../constants/colors'

const Chat = ({ route }) => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const socket = useRef(null)

    const requests = useSelector((state) => state.request?.requests)
    const serviceRequestId = requests.length > 0 && requests[0]._id

    const users = useSelector((state) => state.user?.users)
    const userId = users.length > 0 && users[0]._id

    useEffect(() => {
        const initSocket = async () => {
            socket.current = io('http://192.168.18.183')

            socket.current.emit('joinRoom', { serviceRequestId })

            socket.current.on('receiveMessage', (newMessage) => {
                setMessages((prevMessages) => [...prevMessages, newMessage])
            })

            return () => {
                socket.current.disconnect()
            }
        }

        initSocket()
    }, [serviceRequestId])

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            socket.current.emit('sendMessage', {
                serviceRequestId,
                sender: userId,
                message,
            })

            setMessages((prevMessages) => [
                { sender: userId, message, time: new Date() },
                ...prevMessages,
            ])
            setMessage('')
        }
    }

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
                inverted
            />
            <View style={styles.inputContainer}>
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type your message"
                    style={styles.messageInput}
                />
                <View style={styles.sendIconContainer}>
                    <Icons.SendIcon
                        width={30}
                        height={30}
                        onPress={handleSendMessage}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Chat

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
    },
    messageInput: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    sendIconContainer: {
        backgroundColor: COLORS.primaryBackground,
        borderRadius: 50,
        padding: 10,
    },
})
