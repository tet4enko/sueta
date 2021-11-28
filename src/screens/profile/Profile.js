/* eslint-disable no-underscore-dangle */
import React, {
    useCallback, useState, useEffect, useRef,
} from 'react';
import {
    View, Image, StyleSheet, Dimensions,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { SharedComponents } from '../../shared';

import helmet from '../../../assets/helmet.png';
import car from '../../../assets/car.png';
import add from '../../../assets/add.png';

import { Car } from './Car';

export const Profile = ({ userId, userData, navigation }) => {
    const carouselRef = useRef();
    const [activeCar, setActiveCar] = useState(0);

    const handleAddCarPress = useCallback(() => {
        navigation.navigate('AddCar');
    }, []);

    useEffect(() => {
        if (userData.cars.length && carouselRef.current) {
            setTimeout(() => {
                carouselRef.current.snapToItem(userData.cars.findIndex((item) => item.isCurrent));
            }, 1000);
        }
    }, []);

    useEffect(() => {
        if (userData.cars.length && carouselRef.current) {
            carouselRef.current.snapToItem(0);
        }
    }, [userData.cars.length]);

    return (
        <View style={styles.default}>
            <View style={styles.mainInfo}>
                <View style={styles.avatar}>
                    <Image source={helmet} style={{ width: 140, height: 140 }} />
                </View>
                <View style={styles.stats}>
                    <View style={styles.stat}>
                        <SharedComponents.UI.AppText style={styles.statLabel}>
                            ГОНОК&nbsp;
                        </SharedComponents.UI.AppText>
                        <SharedComponents.UI.AppText style={styles.statValue}>
                            7&nbsp;
                        </SharedComponents.UI.AppText>
                    </View>
                    <View style={styles.stat}>
                        <SharedComponents.UI.AppText style={styles.statLabel}>
                            Рейтинг&nbsp;
                        </SharedComponents.UI.AppText>
                        <SharedComponents.UI.AppText style={styles.statValue}>
                            283&nbsp;
                        </SharedComponents.UI.AppText>
                    </View>
                </View>
            </View>
            <View style={styles.cars}>
                <View style={styles.sectionLabelWrapper}>
                    <Image source={car} style={{ width: 45, height: 30 }} />
                    <SharedComponents.UI.AppText style={styles.sectionLabel}>
                        АВТО&nbsp;
                    </SharedComponents.UI.AppText>
                </View>
                {userData.cars.length ? (
                    <View style={styles.carCarousel}>
                        <Carousel
                            ref={carouselRef}
                            data={userData.cars}
                            renderItem={({ item }) => <Car car={item} userId={userId} />}
                            sliderWidth={Dimensions.get('window').width * 1.1}
                            itemWidth={Dimensions.get('window').width * 0.7}
                            layout="default"
                            layoutCardOffset={28}
                            onSnapToItem={(index) => setActiveCar(index)}
                        />
                        <Pagination
                            dotsLength={userData.cars.length}
                            activeDotIndex={activeCar}
                            dotStyle={styles.carCarouselDot}
                            containerStyle={styles.carCarouselPagination}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                        />
                    </View>
                ) : null}
                {!userData.cars.length ? (
                    <View style={styles.noCars}>
                        <SharedComponents.UI.Touchable onPress={handleAddCarPress}>
                            <Image source={add} style={styles.noCarsAdd} />
                        </SharedComponents.UI.Touchable>
                    </View>
                ) : null}
                {userData.cars.length && userData.cars.length < 3 ? (
                    <View style={styles.addCar}>
                        <SharedComponents.UI.Touchable onPress={handleAddCarPress}>
                            <Image source={add} style={styles.addCarIcon} />
                        </SharedComponents.UI.Touchable>
                    </View>
                ) : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    default: {
        paddingTop: 20,
    },
    defaultWithLoader: {
        flex: 1,
        alignItems: 'center',
    },
    carCarousel: {
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'column',
    },
    carCarouselDot: {
        width: 8,
        height: 8,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
    },
    carCarouselPagination: { paddingVertical: 0, paddingTop: 5 },
    mainInfo: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginBottom: 40,
    },
    avatar: {
        flex: 0.4,
    },
    stats: {
        flex: 0.5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    stat: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 18,
        color: 'white',
    },
    statValue: {
        fontSize: 25,
        color: 'white',
    },
    sectionLabelWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    sectionLabel: {
        color: 'white',
        fontSize: 22,
        marginLeft: 15,
    },
    noCars: {
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noCarsAdd: {
        width: 80,
        height: 80,
    },
    addCar: {
        position: 'absolute',
        right: 40,
    },
    addCarIcon: {
        width: 30,
        height: 30,
    },
});
