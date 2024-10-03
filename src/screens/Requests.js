import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { COLORS } from '../constants/colors'
import { Icons } from '../constants/icons'
import { LAYOUT } from '../constants/layout'
import { useNavigation } from '@react-navigation/native'

const Requests = () => {
    const [selectedId, setSelectedId] = useState()

    const requests = useSelector((state) => state.request?.requests)

    const navigation = useNavigation()

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.item, { backgroundColor }]}
        >
            <View style={styles.listItemContainer}>
                <View>
                    <Text style={[styles.title, { color: textColor }]}>
                        Service:{' '}
                        {item.serviceType === 'puncturefix'
                            ? 'Punnture Fix'
                            : null}
                    </Text>
                    <Text style={[styles.title, { color: textColor }]}>
                        Status: {item.status}
                    </Text>
                </View>
                <View style={styles.sendIconContainer}>
                    <Icons.SendIcon width={30} height={30} />
                </View>
            </View>
        </TouchableOpacity>
    )

    const renderItem = ({ item }) => {
        const backgroundColor =
            item._id === selectedId ? COLORS.accent : COLORS.primary
        const color = item._id === selectedId ? 'white' : 'white'

        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item._id)
                    navigation.navigate('Chat')
                }}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        )
    }
    return (
        <View
            style={[
                styles.container,
                {
                    justifyContent: 'flex-start',
                },
            ]}
        >
            <FlatList
                data={requests}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                extraData={selectedId}
            />
        </View>
    )
}

export default Requests

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.primaryBackground,
        paddingTop: LAYOUT.paddingSmall,
        paddingLeft: LAYOUT.paddingMedium,
        paddingRight: LAYOUT.paddingMedium,
        paddingBottom: LAYOUT.paddingLarge,
    },
    item: {
        padding: 20,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 8,
    },
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sendIconContainer: {
        backgroundColor: COLORS.primaryBackground,
        borderRadius: 50,
        padding: 10,
    },
    title: {
        fontSize: LAYOUT.fontSizeMedium,
    },
})
