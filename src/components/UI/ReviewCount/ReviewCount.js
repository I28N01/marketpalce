import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReviewCount({ adId }) {
    const [reviewCount, setReviewCount] = useState(0);

    useEffect(() => {
        fetchReviewCount(adId);
    }, [adId]);

    const fetchReviewCount = async (adId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8090/ads/${adId}/comments`, {
                headers: {
                    'accept': 'application/json'
                }
            });
            setReviewCount(response.data.length);
        } catch (error) {
            console.error('Ошибка при получении количества отзывов:', error);
        }
    };

    return <span>{reviewCount}</span>;
}

export default ReviewCount;
