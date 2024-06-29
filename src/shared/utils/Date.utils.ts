import {Moment} from 'moment';

export const formatTime = (date: Moment) => date.format('LT');

export const formatDate = (date: Moment) => date.format('dddd, LL');

export const formatDateTime = (date: Moment) => date.format('LLL');
