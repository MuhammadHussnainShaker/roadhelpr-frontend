import { View, Modal, StyleSheet } from 'react-native'
import { LAYOUT } from '../constants/layout'
import { COLORS } from '../constants/colors'

const CustomModal = ({ visible, onRequestClose, children }) => {
    return (
        <Modal
            visible={visible}
            onRequestClose={onRequestClose}
            transparent
            animationType="slide"
        >
            <View
                style={styles.modalContainer}
                onPress={() => console.log('ViewClicked')}
            >
                <View style={styles.subContainer}>{children}</View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.tertiary,
    },
    subContainer: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingLeft: LAYOUT.paddingSmall,
        paddingRight: LAYOUT.paddingSmall,
        paddingTop: LAYOUT.paddingSmall,
        paddingBottom: LAYOUT.paddingMedium,
    },
})

export default CustomModal
