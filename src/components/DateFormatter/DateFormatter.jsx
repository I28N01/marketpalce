import React from 'react';

const DateFormatter = ({ dateStr }) => {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('ru-RU', options);
    };

    // Функция для замены предложного падежа у месяца
    const formatMonthInGenitive = (dateStr) => {
        const monthsInGenitive = [
            'января',
            'февраля',
            'марта',
            'апреля',
            'мая',
            'июня',
            'июля',
            'августа',
            'сентября',
            'октября',
            'ноября',
            'декабря',
        ];
        const date = new Date(dateStr);
        return monthsInGenitive[date.getMonth()];
    };

    const formattedDate = formatDate(dateStr);
    const monthInGenitive = formatMonthInGenitive(dateStr);

    return (
        <span>
            {formattedDate.replace(formattedDate.split(' ')[1], monthInGenitive)}
        </span>
    );
};

export default DateFormatter;
