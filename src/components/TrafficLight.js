import React from 'react';
import {
    Animated, StyleSheet, Image, Dimensions,
} from 'react-native';

const red = require('../../assets/red.png');
const yellow = require('../../assets/yellow.png');
const green = require('../../assets/green.png');

const pics = {
    red,
    yellow,
    green,
};

const TrafficLight = ({ color, style }) => (
    <Animated.View style={{ ...styles.wrap, ...style }}>
        <Image
            source={pics[color]}
            style={{ width: Dimensions.get('window').width * 0.7 }}
            resizeMode="contain"
        />
    </Animated.View>
);

export default TrafficLight;

const styles = StyleSheet.create({
    wrap: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
