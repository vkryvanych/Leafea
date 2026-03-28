import { useState, useEffect } from 'react';
import girl2_ava from '../assets/girl2_ava.jpg'; 

const MOCK_SAVED_ITEMS: any[] = [];

export const useCabinetData = () => {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            const stats = {
                movies: MOCK_SAVED_ITEMS.filter(item => item.category === 'movie').length,
                series: MOCK_SAVED_ITEMS.filter(item => item.category === 'series').length,
                anime: MOCK_SAVED_ITEMS.filter(item => item.category === 'anime').length,
                books: MOCK_SAVED_ITEMS.filter(item => item.category === 'book').length,
            };

            setUserData({
                name: "Вікторія",
                avatar: girl2_ava,
                stats: stats,
                savedItems: MOCK_SAVED_ITEMS 
            });
            setLoading(false);
        }, 800); 

        return () => clearTimeout(timer);
    }, []);

    return { userData, loading };
};