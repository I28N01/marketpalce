import React from 'react';

const TimeFormatter = ({ time }) => {
    const format24HourTime = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes;
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('ru-RU', options);
    };

    const isToday = (date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    const isYesterday = (date) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return (
            date.getDate() === yesterday.getDate() &&
            date.getMonth() === yesterday.getMonth() &&
            date.getFullYear() === yesterday.getFullYear()
        );
    };

    const date = new Date(time);

    if (isToday(date)) {
        return <span>Сегодня в {format24HourTime(date)}</span>;
    } else if (isYesterday(date)) {
        return <span>Вчера в {format24HourTime(date)}</span>;
    } else {
        return <span>{formatDate(date)} в {format24HourTime(date)}</span>;
    }
};

export default TimeFormatter;
