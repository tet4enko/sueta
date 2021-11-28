import React, {
    forwardRef, useMemo, useCallback,
} from 'react';
import { useSelector } from 'react-redux';
import { Modalize } from 'react-native-modalize';
import {
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { SharedComponents } from '../../../shared';

import { linkingLib } from '../../../shared/lib';
import { getCurrentUserId } from '../../user/store/selectors/selectors';

import { eventSelectors } from '../store';

import { Stats } from './Stats';

export const Card = forwardRef(({
    onClosed,
    onPressStart,
}, ref) => {
    const meta = useSelector(eventSelectors.getCurrentEventMeta);
    const navData = useSelector(eventSelectors.getCurrentEventNavData);
    const rating = useSelector(eventSelectors.getCurrentEventRating);
    const currentUserId = useSelector(getCurrentUserId);

    const handleOrganizerClick = useCallback(
        () => {
            console.log('click');
            if (!meta || !meta.organizer) {
                return;
            }

            console.log(meta.organizer);

            linkingLib.openUserInInstagram(meta.organizer);
        },
        [meta],
    );

    const modalContent = useMemo(() => {
        if (!meta) {
            return null;
        }

        const {
            name, description, organizer, startLatitude, startLongitude,
        } = meta;

        return (
            <View style={styles.wrap}>
                <View style={styles.info}>
                    <View style={styles.header}>
                        <SharedComponents.UI.AppText style={styles.name}>
                            {name}
                        </SharedComponents.UI.AppText>
                        <SharedComponents.UI.AppText style={styles.description}>
                            {description}
                        </SharedComponents.UI.AppText>
                        <View style={styles.organizer}>
                            <SharedComponents.UI.AppText style={styles.organizerLabel}>
                                Организатор:&nbsp;
                            </SharedComponents.UI.AppText>
                            <SharedComponents.UI.Touchable onPress={handleOrganizerClick}>
                                <SharedComponents.UI.AppText style={styles.organizerValue}>
                                    {`@${organizer}`}
                                </SharedComponents.UI.AppText>
                            </SharedComponents.UI.Touchable>
                        </View>
                    </View>
                    {!rating && (
                        <ActivityIndicator size="large" color="white" style={styles.statsSpinner} />
                    )}
                    {rating && (
                        <Stats rating={rating} currentUserId={currentUserId} />
                    )}
                </View>
                <View style={styles.buttons}>
                    <SharedComponents.StartButton
                        onPress={onPressStart}
                        eventLatitude={startLatitude}
                        eventLongitude={startLongitude}
                        isAction
                    />
                </View>
            </View>
        );
    }, [meta, navData, rating]);

    return (
        <Modalize
            adjustToContentHeight
            ref={ref}
            onClosed={onClosed}
            withOverlay={false}
            modalStyle={styles.modal}
        >
            {modalContent}
        </Modalize>
    );
});

const styles = StyleSheet.create({
    modal: { backgroundColor: '#32274c' },
    // background: {
    //     flex: 1,
    //     justifyContent: 'center',
    // },
    wrap: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 25,
        height: 500,
    },
    info: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 13,
        paddingVertical: 10,
        paddingHorizontal: 20,
        height: 350,
    },
    name: {
        fontSize: 23,
        textAlign: 'center',
        color: 'white',
        marginBottom: 5,
    },
    description: {
        color: 'white',
        fontFamily: 'centurygothicBold',
        textAlign: 'center',
        marginBottom: 5,
    },
    organizer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    organizerLabel: {
        color: 'white',
        fontFamily: 'centurygothic',
        textAlign: 'center',
    },
    organizerValue: {
        color: 'yellow',
        fontFamily: 'centurygothic',
        textAlign: 'center',
        fontSize: 17,
    },
    buttons: {
        height: 110,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    statsSpinner: {
        marginTop: 100,
    },
});
