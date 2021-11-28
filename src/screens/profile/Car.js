import React, {
    useCallback, useState, useMemo, useEffect,
} from 'react';
import {
    View, Image, StyleSheet, Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';

import { AntDesign } from '@expo/vector-icons';
import { getCarPhoto, getCarInfo, getCarThumbnail } from '../../shared/lib/cars';

import { SharedComponents } from '../../shared';

import gear from '../../../assets/gear.png';
import remove from '../../../assets/remove.png';
import goldStar from '../../../assets/fav1.png';
import whiteStar from '../../../assets/fav2.png';

import { removeCar, setCurrentCar } from '../../shared/store/actions/users';

export const Car = ({
    car,
    userId,
}) => {
    const dispatch = useDispatch();

    const { isCurrent } = car;

    const info = getCarInfo(car);
    const photo = getCarPhoto(car);
    const thumbnail = getCarThumbnail(car);

    const [isEditing, setIsEditing] = useState(false);
    const [isProgress, setIsProgress] = useState(false);

    const toggleModal = useCallback(
        () => {
            setIsEditing(!isEditing);
        },
        [setIsEditing, isEditing],
    );

    useEffect(() => {
        setIsEditing(false);
        setIsProgress(false);
    }, [
        car.brand,
        car.model,
        car.generation,
        car.configuration,
        setIsEditing,
        setIsProgress,
    ]);

    const carLabel = useMemo(() => `${info.brand} ${info.model}`, [info]);

    const handleOnRemovePress = useCallback(
        async () => {
            setIsProgress(true);
            await dispatch(removeCar(
                userId,
                car,
            ));
        },
        [car],
    );

    const removeAlert = () => Alert.alert(
        'Удаление машины',
        `Вы уверены, что хотите удалить ${carLabel} ?`,
        [
            {
                text: 'Отмена',
                style: 'cancel',
            },
            { text: 'Удалить', onPress: handleOnRemovePress },
        ],
    );

    const makeCurrent = useCallback(
        async () => {
            setIsProgress(true);
            await dispatch(setCurrentCar(
                userId,
                car,
            ));
            setIsProgress(false);
        },
        [],
    );

    return (
        <View style={styles.car}>
            {isCurrent && (<Image source={goldStar} style={styles.isCurrent} />)}
            <SharedComponents.UI.ProgressiveImage
                mainSource={{ uri: photo }}
                thumbnailSource={{ uri: thumbnail }}
                style={styles.carImage}
            />
            <SharedComponents.UI.AppText style={styles.carLabel}>
                {carLabel}
&nbsp;
            </SharedComponents.UI.AppText>
            <View style={styles.gearWrapper}>
                <SharedComponents.UI.Touchable onPress={toggleModal}>
                    <Image style={styles.gear} source={gear} />
                </SharedComponents.UI.Touchable>
            </View>
            <Modal isVisible={isEditing} backdropOpacity={0.9}>
                <View style={styles.modal}>
                    {isProgress ? (
                        <SharedComponents.UI.Spinner visible />
                    ) : (
                        <>
                            <View style={styles.modalLabel}>
                                <SharedComponents.UI.AppText style={styles.modalLabelText}>
                                    {carLabel}
&nbsp;
                                </SharedComponents.UI.AppText>
                                {isCurrent && (
                                    <SharedComponents.UI.AppText style={{
                                        ...styles.modalLabelText, ...styles.modalLabelTextDescription,
                                    }}
                                    >
                                        ( текущая )
                                    </SharedComponents.UI.AppText>
                                )}
                            </View>
                            <View style={styles.modalCarPhotoWrapper}>
                                <SharedComponents.UI.ProgressiveImage
                                    mainSource={{ uri: photo }}
                                    thumbnailSource={{ uri: thumbnail }}
                                    style={styles.carImage}
                                />
                                {isCurrent && (<Image source={goldStar} style={styles.isCurrent} />)}
                            </View>
                            <View style={styles.modalButtons}>
                                {!isCurrent && (
                                    <View style={styles.modalButton}>
                                        <SharedComponents.UI.Touchable onPress={makeCurrent}>
                                            <Image resizeMode="contain" source={whiteStar} style={styles.modalButtonIcon} />
                                            <SharedComponents.UI.AppText style={styles.modalButtonLabel}>
                                                Сделать основной&nbsp;
                                            </SharedComponents.UI.AppText>
                                        </SharedComponents.UI.Touchable>
                                    </View>
                                )}
                                <View style={styles.modalButton}>
                                    <SharedComponents.UI.Touchable onPress={removeAlert}>
                                        <Image resizeMode="contain" source={remove} style={styles.modalButtonIcon} />
                                        <SharedComponents.UI.AppText style={styles.modalButtonLabel}>
                                            Удалить
                                        </SharedComponents.UI.AppText>
                                    </SharedComponents.UI.Touchable>
                                </View>
                            </View>
                            <View style={styles.modalButton}>
                                <SharedComponents.UI.Touchable onPress={toggleModal}>
                                    <AntDesign name="back" size={48} color="white" style={styles.modalButtonIcon} />
                                    <SharedComponents.UI.AppText style={{ ...styles.modalButtonLabel, ...styles.back }}>
                                        Назад
                                    </SharedComponents.UI.AppText>
                                </SharedComponents.UI.Touchable>
                            </View>

                        </>
                    )}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    car: {
        height: 230,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    carImage: {
        height: 190,
        width: '100%',
        borderRadius: 20,
    },
    gearWrapper: {
        position: 'absolute',
        top: 10,
        right: 5,
        padding: 5,
    },
    gear: {
        width: 25,
        height: 25,
    },
    carLabel: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'centurygothicBold',
        textAlign: 'center',
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalLabel: {
        marginBottom: 20,
    },
    modalLabelText: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'centurygothicBold',
        textAlign: 'center',
    },
    modalLabelTextDescription: {
        fontFamily: 'centurygothic',
        fontSize: 20,
    },
    modalCarPhotoWrapper: {
        height: 190,
        width: '70%',
        marginBottom: 30,
    },
    modalButtons: {
        display: 'flex',
        flexDirection: 'row',
        width: '70%',
        justifyContent: 'space-evenly',
    },
    modalButton: {
        display: 'flex',
        flexDirection: 'column',
        width: 70,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 30,
    },
    modalButtonIcon: {
        height: 50,
        width: 50,
        marginBottom: 3,
    },
    modalButtonLabel: {
        color: 'white',
        fontSize: 11,
        fontFamily: 'centurygothic',
        textAlign: 'center',
    },
    back: {
        bottom: 8,
    },
    isCurrent: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
        height: 25,
        width: 25,
    },
});
