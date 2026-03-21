import { useState, useEffect } from 'react';
import card1 from '../assets/card_1.jpg';
import card2 from '../assets/card_2.jpg';


const MOCK_SAVED_ITEMS = [
    {
        id: 1,
        title: "Джокер",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
        image: card1,
        category: "movie" 
    },
    {
        id: 2,
        title: "Ідеальний сум",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
        image: card2,
        category: "anime" 
    },
    {
        id: 3,
        title: "Перевтілення",
        description: "Класичний твір Франца Кафки...",
        image: card1, 
        category: "book" 
    },
     {
        id: 4,
        title: "Граф Монте-Крісто",
        description: "Класичний твір Франца Кафки...",
        image: card1, 
        category: "book" 
    }
];

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
                avatar: "https://i.pravatar.cc/150?img=47",
                stats: stats,
                savedItems: MOCK_SAVED_ITEMS 
            });
            setLoading(false);
        }, 800); 

        return () => clearTimeout(timer);
    }, []);

    return { userData, loading };
};