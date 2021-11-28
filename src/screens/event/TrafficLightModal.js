import React from 'react';
import {
    View, Image, StyleSheet, Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';

const red = require('../../../assets/red.png');
const yellow = require('../../../assets/yellow.png');
const green = require('../../../assets/green.png');

const pics = {
    red,
    yellow,
    green,
};

export const TrafficLightModal = ({ isVisible, color }) => (
    <Modal isVisible={isVisible} backdropOpacity={0.9}>
        <View style={styles.modal}>
            <Image
                source={pics[color]}
                style={{ width: Dimensions.get('window').width * 0.7 }}
                resizeMode="contain"
            />
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
