import React, {
    forwardRef, useMemo, useEffect, useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modalize } from 'react-native-modalize';
import {
    View,
    StyleSheet,
    Image,
    ActivityIndicator,
    Linking,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { AppTextBold } from '../../../components/ui/AppTextBold';
import { AppText } from '../../../components/ui/AppText';
import { AppButton } from '../../../components/ui/AppButton';
import NavigateButton from '../../../components/NavigateButton';
import StartButton from '../../../components/StartButton';

import {
    getUserById,
} from '../../../store/selectors';

import { eventSelectors } from '../store';

import Touchable from '../../../components/ui/Touchable';

import { getUserProfile } from '../../../store/actions/user';

const noUserAvatar = 'https://img2.freepng.ru/20180412/owe/kisspng-female-silhouette-clip-art-user-avatar-5acfd8e84206c7.3975166315235709202705.jpg';

export const Card = forwardRef(({
    onClosed,
    onPressBack, onPressStart,
}, ref) => {
    const dispatch = useDispatch();
    const { colors } = useTheme();

    const meta = useSelector(eventSelectors.getCurrentEventMeta);
    const navData = useSelector(eventSelectors.getCurrentEventNavData);
    const topThreeRaces = useSelector(eventSelectors.getCurrentEventTopThreeRaces);
    const userStats = useSelector(eventSelectors.getCurrentEventUserStats);
    const top1User = useSelector(getUserById(topThreeRaces && topThreeRaces[0] && topThreeRaces[0].user));
    const top2User = useSelector(getUserById(topThreeRaces && topThreeRaces[1] && topThreeRaces[1].user));
    const top3User = useSelector(getUserById(topThreeRaces && topThreeRaces[2] && topThreeRaces[2].user));

    useEffect(() => {
        if (!topThreeRaces) {
            return;
        }

        if (topThreeRaces[0]) {
            dispatch(getUserProfile(topThreeRaces[0].user));
        }
        if (topThreeRaces[1]) {
            dispatch(getUserProfile(topThreeRaces[1].user));
        }
        if (topThreeRaces[2]) {
            dispatch(getUserProfile(topThreeRaces[2].user));
        }
    }, [topThreeRaces]);

    const handleOnPressTop1Race = useCallback(() => {
        const url = `instagram://user?username=${top1User.username}`;
        if (top1User && top1User.username && Linking.canOpenURL(url)) {
            Linking.openURL(url);
        }
    }, [top1User]);
    const handleOnPressTop2Race = useCallback(() => {
        const url = `instagram://user?username=${top2User.username}`;
        if (top2User && top2User.username && Linking.canOpenURL(url)) {
            Linking.openURL(url);
        }
    }, [top2User]);
    const handleOnPressTop3Race = useCallback(() => {
        const url = `instagram://user?username=${top3User.username}`;
        if (top3User && top3User.username && Linking.canOpenURL(url)) {
            Linking.openURL(url);
        }
    }, [top3User]);

    const modalContent = useMemo(() => {
        if (!meta) {
            return null;
        }

        const {
            name, description, startLatitude, startLongitude,
        } = meta;

        return (
            <View style={styles.wrap}>
                <View style={styles.header}>
                    <AppTextBold style={{ ...styles.name, color: colors.primary }}>{name}</AppTextBold>
                    {navData && (
                        <AppText style={{ ...styles.navigationData, color: colors.border }}>
                            {`(${navData.distance.toFixed(1)} км)`}
                        </AppText>
                    )}
                </View>
                <AppText style={{ ...styles.description, color: colors.text }}>{description}</AppText>
                {topThreeRaces ? (
                    <View style={styles.stats}>
                        <Touchable onPress={handleOnPressTop2Race}>
                            <View style={styles.statsItem}>
                                <Image
                                    style={{ ...styles.avatar, ...styles.second }}
                                    source={{
                                        uri: noUserAvatar,
                                    }}
                                />
                                <View style={styles.statsItemText}>
                                    <AppText style={styles.statsItemTextLabel}>
                                        {topThreeRaces[1] ? `${topThreeRaces[1].time} сек` : '–'}
                                    </AppText>
                                </View>
                            </View>
                        </Touchable>
                        <Touchable onPress={handleOnPressTop1Race}>
                            <View style={styles.statsItem}>
                                <Image
                                    style={{ ...styles.avatar, ...styles.first }}
                                    source={{
                                        uri: noUserAvatar,
                                    }}
                                />
                                <View style={styles.statsItemText}>
                                    <AppTextBold style={styles.statsItemTextLabel}>
                                        {topThreeRaces[0] ? `${topThreeRaces[0].time} сек` : '–'}
                                    </AppTextBold>
                                </View>
                            </View>
                        </Touchable>
                        <Touchable onPress={handleOnPressTop3Race}>
                            <View style={styles.statsItem} onPress={handleOnPressTop3Race}>
                                <Image
                                    style={{ ...styles.avatar, ...styles.third }}
                                    source={{
                                        uri: noUserAvatar,
                                    }}
                                />
                                <View style={styles.statsItemText}>
                                    <AppText style={styles.statsItemTextLabel}>
                                        {topThreeRaces[2] ? `${topThreeRaces[2].time} сек` : '–'}
                                    </AppText>
                                </View>
                            </View>
                        </Touchable>
                    </View>
                ) : (
                    <View style={styles.stats}>
                        <ActivityIndicator size="small" color={colors.primary} />
                    </View>
                )}
                <StartButton style={styles.startButton} onPress={onPressStart} />
                <View style={styles.stats}>
                    <View style={styles.statsItem}>
                        <MaterialCommunityIcons name="trophy-award" size={36} style={styles.statsItemPic} />
                        <View style={styles.statsItemText}>
                            <AppText style={styles.statsItemTextLabel}>Позиция: </AppText>
                            <AppTextBold>{userStats ? `${userStats.position}` : '-'}</AppTextBold>
                        </View>
                    </View>
                    <View style={styles.statsItem}>
                        <AppText style={{ color: colors.border }}>|</AppText>
                    </View>
                    <View style={styles.statsItem}>
                        <Ionicons name="stopwatch" size={36} style={styles.statsItemPic} />
                        <View style={styles.statsItemText}>
                            <AppText style={styles.statsItemTextLabel}>Лучшее время: </AppText>
                            <AppTextBold>{userStats ? `${userStats.time} сек` : '-'}</AppTextBold>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomButtons}>
                    <AppButton onPress={onPressBack} color="#fff">
                        <AntDesign name="back" size={24} style={{ color: colors.border }} />
                        <AppText style={{ ...styles.buttonText, color: colors.border }}>Назад</AppText>
                    </AppButton>
                    <NavigateButton
                        latitude={startLatitude}
                        longitude={startLongitude}
                        text="Маршрут"
                    />
                </View>
            </View>
        );
    }, [meta, navData, topThreeRaces]);

    return (
        <Modalize
            adjustToContentHeight
            ref={ref}
            onClosed={onClosed}
            withOverlay={false}
        >
            {modalContent}
        </Modalize>
    );
});

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 25,
        paddingTop: 10,
        paddingBottom: 35,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontFamily: 'open-bold',
        fontSize: 25,
        paddingBottom: 10,
    },
    description: {
        fontSize: 17,
    },
    navigationData: {
        fontSize: 18,
        marginLeft: 10,
        lineHeight: 40,
        marginBottom: 3,
    },
    buttonText: {
        fontSize: 20,
        paddingLeft: 10,
    },
    bottomButtons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
    },
    stats: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 15,
        height: 90,
    },
    statsItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    statsItemPic: {
        opacity: 0.7,
    },
    statsItemText: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
    },
    statsItemTextLabel: {
        opacity: 0.7,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 100,
        borderWidth: 3,
    },
    first: {
        borderColor: '#FFD700',
    },
    second: {
        borderColor: '#C0C0C0',
    },
    third: {
        borderColor: '#cd7f32',
    },
    startButton: {
        marginTop: 20,
    },
});
