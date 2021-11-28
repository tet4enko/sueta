import React from 'react';

import {
    View,
    Image,
    StyleSheet,
} from 'react-native';
// import { useSelector } from 'react-redux';

import { timeLib } from '../../../shared/lib';
import { SharedComponents } from '../../../shared';

import helmetIcon from '../../../../assets/helmet.png';
import top1Icon from '../../../../assets/top1.png';
import top2Icon from '../../../../assets/top2.png';
import top3Icon from '../../../../assets/top3.png';

// import { getUsers } from '../../../shared/store/selectors/users';

const EMPTY_TIME = '–– . –– . ––';
const EMPTY_CAR = '–––';

const Stat = ({
    data, icon, index, currentUserPosition,
}) => {
    const isCurrentUser = currentUserPosition && index === currentUserPosition;

    return (
        <View style={styles.stat}>
            <Image style={styles.icon} source={icon} resizeMode="contain" />
            <SharedComponents.UI.AppText
                style={StyleSheet.compose(styles.position, isCurrentUser ? styles.currentUser : {})}
            >
                {index}
            </SharedComponents.UI.AppText>
            <Image style={styles.icon} source={data ? helmetIcon : undefined} resizeMode="contain" />
            <SharedComponents.UI.AppText
                style={StyleSheet.compose(styles.time, isCurrentUser ? styles.currentUser : {})}
            >
                {data ? timeLib.prettyTime(data.time) : EMPTY_TIME}
            </SharedComponents.UI.AppText>
            <SharedComponents.UI.AppText
                style={StyleSheet.compose(styles.car, isCurrentUser ? styles.currentUser : {})}
            >
                {data && data.car ? data.car.model : EMPTY_CAR}
        &nbsp;
            </SharedComponents.UI.AppText>
        </View>
    );
};

export const Stats = ({ rating }) => {
    // const usersData = useSelector(getUsers(rating.list.map((race) => race.userId)));
    const { currentUserPosition, list } = rating;
    const [top1, top2, top3] = list;

    return (
        <View style={styles.stats}>
            <Stat data={top1} icon={top1Icon} index={1} currentUserPosition={currentUserPosition} />
            <Stat data={top2} icon={top2Icon} index={2} currentUserPosition={currentUserPosition} />
            <Stat data={top3} icon={top3Icon} index={3} currentUserPosition={currentUserPosition} />
            {currentUserPosition && currentUserPosition > 4 ? (
                <Stat />
            ) : null}
            {currentUserPosition && currentUserPosition > 3 ? (
                <Stat
                    data={list[currentUserPosition - 1]}
                    index={currentUserPosition}
                    currentUserPosition={currentUserPosition}
                />
            ) : null}
        </View>
    );
};

const styles = ({
    stats: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 15,
    },
    stat: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 30,
        marginVertical: 2,
    },
    icon: {
        width: '10%',
        maxHeight: 25,
    },
    position: {
        width: '10%',
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        marginRight: 10,
        fontFamily: 'centurygothic',
    },
    time: {
        width: '40%',
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'centurygothic',
    },
    car: {
        width: '30%',
        overflow: 'hidden',
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'centurygothic',
    },
    currentUser: {
        fontFamily: 'centurygothicBold',
        color: 'yellow',
    },
});
