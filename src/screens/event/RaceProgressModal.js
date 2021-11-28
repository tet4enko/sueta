import React from 'react';
import {
    View, StyleSheet, Alert, ActivityIndicator, Image,
} from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';
import { StopWatch } from './Stopwatch';
import { SharedComponents } from '../../shared';

import finishFlag from '../../../assets/finish_flag.png';

export const RaceProgressModal = ({
    isVisible, startTime, finishTime, onExit, isResultsReady, resultsData,
}) => {
    const exitAlert = () => Alert.alert(
        'Выход',
        'Вы уверены?',
        [
            {
                text: 'Отмена',
                style: 'cancel',
            },
            { text: 'Выйти', onPress: onExit },
        ],
    );

    return (
        <Modal isVisible={isVisible} backdropOpacity={0.9}>
            {startTime && !finishTime && (
                <>
                    <View style={styles.modal}>
                        <SharedComponents.UI.AppText style={styles.go}> GO GO GO </SharedComponents.UI.AppText>
                        <SharedComponents.UI.AppText style={styles.stopwatchLabel}> Время </SharedComponents.UI.AppText>
                        <StopWatch
                            startTime={startTime}
                            msecs
                            start={Boolean(startTime && !finishTime)}
                            style={styles.stopwatch}
                        />
                        <SharedComponents.NavigateButton style={styles.navigate} text="Навигатор" />
                    </View>
                    <View style={styles.exitWrapper}>
                        <SharedComponents.UI.AppButton
                            style={styles.exit}
                            text="Завершить"
                            gradientColors={['#8c0200', '#f54300']}
                            onPress={exitAlert}
                        />
                    </View>
                </>
            )}
            {finishTime && (
                <View style={styles.modal}>
                    <Image style={styles.finishFlag} source={finishFlag} resizeMode="contain" />
                    <View style={styles.exitWrapper}>
                        <SharedComponents.UI.AppButton
                            style={styles.exit}
                            text="OK"
                            onPress={onExit}
                        />
                    </View>
                    <SharedComponents.UI.AppText style={styles.finish}> ФИНИШ </SharedComponents.UI.AppText>
                    <View style={styles.results}>
                        <View style={styles.result}>
                            <SharedComponents.UI.AppText style={styles.resultLabel}>
                                ВРЕМЯ&nbsp;
                            </SharedComponents.UI.AppText>
                            <SharedComponents.UI.AppText style={styles.resultValue}>
                                {moment.utc(moment.duration(finishTime - startTime).as('milliseconds')).format('HH:mm:ss')}
    &nbsp;
                            </SharedComponents.UI.AppText>
                        </View>
                        {!isResultsReady && (
                            <ActivityIndicator style={styles.spinner} size="large" color="white" />
                        )}
                        {isResultsReady && resultsData && (
                            <>
                                <View style={styles.result}>
                                    <SharedComponents.UI.AppText style={styles.resultLabel}>
                                        ТЕКУЩАЯ ПОЗИЦИЯ
                                        &nbsp;
                                    </SharedComponents.UI.AppText>
                                    <SharedComponents.UI.AppText style={styles.resultValue}>
                                        {resultsData.position}
&nbsp;
                                    </SharedComponents.UI.AppText>
                                </View>
                                <View style={styles.result}>
                                    <SharedComponents.UI.AppText style={styles.resultLabel}>
                                        ЛУЧШЕЕ ВРЕМЯ&nbsp;
                                    </SharedComponents.UI.AppText>
                                    <SharedComponents.UI.AppText style={styles.resultValue}>
                                        {moment.utc(moment.duration(resultsData.bestTime).as('milliseconds')).format('HH:mm:ss')}
&nbsp;
                                    </SharedComponents.UI.AppText>
                                </View>
                                {true && (
                                    <SharedComponents.UI.AppText style={styles.record}>
                                        Новый рекорд
                                        &nbsp;
                                    </SharedComponents.UI.AppText>
                                )}
                            </>
                        )}
                    </View>
                </View>
            )}
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    go: {
        bottom: 180,
        fontSize: 50,
        color: 'yellow',
    },
    stopwatchLabel: {
        color: 'white',
        fontSize: 20,
    },
    stopwatch: {
        color: 'white',
        fontSize: 60,
        marginBottom: 40,
    },
    navigate: {
        width: 200,
    },
    exitWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        bottom: 40,
    },
    exit: {
        width: 200,
    },
    finish: {
        color: 'white',
        fontSize: 50,
        marginBottom: 20,
    },
    result: {
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    resultLabel: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    resultValue: {
        color: 'yellow',
        fontSize: 27,
        textAlign: 'center',
    },
    results: {
        width: '100%',
    },
    spinner: {
        marginTop: 20,
    },
    record: {
        color: '#5cca5c',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 20,
    },
    finishFlag: {
        position: 'absolute',
        top: 0,
        height: 300,
    },
});
