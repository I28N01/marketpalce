import React, { useState } from 'react';
import styles from "./PhoneNumber.module.scss";
const PhoneNumberDisplay = ({ phoneNumber }) => {
    const [showFullNumber, setShowFullNumber] = useState(false);

    const formattedPhoneNumber = showFullNumber
        ? phoneNumber
        : phoneNumber.slice(0, 6) + 'XXX XX XX';

    const handleButtonClick = () => {
        setShowFullNumber(!showFullNumber);
    };

    return (
        <div>
            <button className={styles.button} onClick={handleButtonClick} >{showFullNumber ? 'Скрыть номер' : 'Показать полный номер'}
                <span>{formattedPhoneNumber}</span>
            </button>
        </div>
    );
};

export default PhoneNumberDisplay;
