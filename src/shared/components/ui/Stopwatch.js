/* eslint-disable camelcase */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { View } from 'react-native';
import { AppText } from './AppText';

import { themeLib } from '../../lib';

const formatTimeString = (time, showMsecs) => {
    let msecs = time % 1000;

    if (msecs < 10) {
        msecs = `00${msecs}`;
    } else if (msecs < 100) {
        msecs = `0${msecs}`;
    }

    let seconds = Math.floor(time / 1000);
    let minutes = Math.floor(time / 60000);
    const hours = Math.floor(time / 3600000);
    seconds -= minutes * 60;
    minutes -= hours * 60;
    let formatted;
    if (showMsecs) {
        formatted = `${hours < 10 ? 0 : ''}${hours}:${
            minutes < 10 ? 0 : ''
        }${minutes}:${seconds < 10 ? 0 : ''}${seconds}:${msecs}`;
    } else {
        formatted = `${hours < 10 ? 0 : ''}${hours}:${
            minutes < 10 ? 0 : ''
        }${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
    }

    return formatted;
};

export class StopWatch extends Component {
    constructor(props) {
        super(props);
        const { startTime } = props;
        this.state = {
            startTime: null,
            stopTime: null,
            pausedTime: null,
            // eslint-disable-next-line react/no-unused-state
            started: false,
            elapsed: startTime || 0,
        };
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
        this.formatTime = this.formatTime.bind(this);
        // const width = props.msecs ? 220 : 150;
        this.defaultStyles = {
            container: {
                backgroundColor: themeLib.MAIN_COLOR,
                padding: 5,
                borderRadius: 5,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            },
            text: {
                fontSize: 30,
                color: '#FFF',
            },
        };
    }

    componentDidMount() {
        if (this.props.start) {
            this.start();
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.start) {
            this.start();
        } else {
            this.stop();
        }
        if (newProps.reset) {
            this.reset();
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    start() {
        if (this.props.laps && this.state.elapsed) {
            const lap = new Date() - this.state.stopTime;
            this.setState({
                stopTime: null,
                pausedTime: this.state.pausedTime + lap,
            });
        }

        this.setState({
            startTime: this.state.elapsed ? new Date() - this.state.elapsed
                : new Date(),
            started: true,
        });

        this.interval = this.interval ? this.interval : setInterval(() => {
            this.setState({ elapsed: new Date() - this.state.startTime });
        }, 1);
    }

    stop() {
        if (this.interval) {
            if (this.props.laps) {
                this.setState({ stopTime: new Date() });
            }

            clearInterval(this.interval);
            this.interval = null;
        }
        this.setState({ started: false });
    }

    reset() {
        const { startTime } = this.props;
        this.setState({
            elapsed: startTime || 0,
            startTime: null,
            stopTime: null,
            pausedTime: null,
        });
    }

    formatTime() {
        const { getTime, getMsecs, msecs } = this.props;
        const now = this.state.elapsed;
        const formatted = formatTimeString(now, msecs);
        if (typeof getTime === 'function') {
            getTime(formatted);
        }
        if (typeof getMsecs === 'function') {
            getMsecs(now);
        }
        return formatted;
    }

    render() {
        const styles = this.props.options ? this.props.options : this.defaultStyles;

        return (
            <View ref="stopwatch" style={styles.container}>
                <AppText style={styles.text}>{this.formatTime()}</AppText>
            </View>
        );
    }
}
