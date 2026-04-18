import { useState, useEffect } from 'react';
import axios from 'axios';
import girl2_ava from '../assets/girl2_ava.jpg'; 

export const useCabinetData = () => {
    const [userData, setUserData] = useState<any>(null);
    const [localItems, setLocalItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCabinetData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/cabinet', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const fetchedItems = response.data;
                setLocalItems(fetchedItems); 

                const stats = {
                    movies: fetchedItems.filter((item: any) => item.category === 'movie').length,
                    series: fetchedItems.filter((item: any) => item.category === 'series').length,
                    anime: fetchedItems.filter((item: any) => item.category === 'anime').length,
                    books: fetchedItems.filter((item: any) => item.category === 'book').length,
                };

                const storedName = localStorage.getItem('userName') || "Користувач";

                setUserData({
                    name: storedName,
                    avatar: girl2_ava,
                    stats: stats
                });
            } catch (error) {
                console.error("Помилка завантаження кабінету:", error);
                setUserData({
                    name: localStorage.getItem('userName') || "Користувач",
                    avatar: girl2_ava,
                    stats: { movies: 0, series: 0, anime: 0, books: 0 }
                });
            } finally {
                setLoading(false);
            }
        };

        fetchCabinetData();
    }, []);

    return { userData, loading, localItems, setLocalItems };
}; 