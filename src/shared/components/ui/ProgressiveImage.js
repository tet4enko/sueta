import React, { useState, useMemo, useRef } from 'react';
import { Image, View, Animated } from 'react-native';

export const ProgressiveImage = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const { mainSource, thumbnailSource, style } = props;
    const mainImageProps = useMemo(() => ({
        ...props,
        source: mainSource,
    }), [isLoaded, mainSource, style, fadeAnim]);
    const thumbnailImageProps = useMemo(() => ({
        ...props,
        source: thumbnailSource,
        style: {
            ...style,
            position: 'absolute',
            zIndex: isLoaded ? 1 : 2,
        },
    }), [isLoaded, thumbnailSource, style]);

    const animatedViewStyle = {
        ...style,
        position: 'absolute',
        zIndex: isLoaded ? 2 : 1,
        opacity: fadeAnim,
    };

    return (
        <View style={{
            ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',
        }}
        >
            <Animated.View style={animatedViewStyle}>
                <Image
                    {...mainImageProps}
                    onLoad={() => {
                        setIsLoaded(true);

                        Animated.timing(
                            fadeAnim,
                            {
                                toValue: 1,
                                duration: 1000,
                                useNativeDriver: true,
                            },
                        ).start();
                    }}
                />
            </Animated.View>
            <Image
                {...thumbnailImageProps}
                blurRadius={100}
            />
        </View>
    );
};
