import moment from 'moment';

export const prettyTime = (input) => moment.utc(moment.duration(input).as('milliseconds')).format('HH:mm:ss');
