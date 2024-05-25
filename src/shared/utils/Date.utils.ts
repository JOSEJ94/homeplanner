import {Moment} from 'moment';

export const formatTime = (date: Moment) => date.format('LT');

export const formatDateTime = (date: Moment) => date.format('LLL');
