/* eslint-disable camelcase */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import moment from 'moment';
import { SharedComponents } from '../../shared';

export class StopWatch extends Component {
    constructor(props) {
        super(props);
        const { startTime } = props;
        this.state = {
            startTime: null,
            stopTime: null,
            pausedTime: null,
            started: false,
            elapsed: new Date() - startTime,
        };
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
    }

    UNSAFE_componentWillMount() {
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
        this.setState({
            startTime: this.props.startTime || new Date(),
            started: true,
        });

        this.interval = this.interval ? this.interval : setInterval(() => {
            this.setState({ elapsed: new Date() - this.state.startTime });
        }, 1000);
    }

    stop() {
        if (this.interval) {
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

    render() {
        const duration = moment.duration(this.state.elapsed);

        return (
            <>
                {this.state.started && this.state.elapsed ? (
                    <SharedComponents.UI.AppText style={this.props.style}>
                        {moment.utc(duration.as('milliseconds')).format('HH:mm:ss')}
&nbsp;
                    </SharedComponents.UI.AppText>
                ) : null}
            </>
        );
    }
}
