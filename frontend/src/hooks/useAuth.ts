import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { SyntheticEvent } from 'react';


const isTokenValid = (token: string | null) => {
    if (!token) return false;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp > currentTime;
    } catch (e) {
        return false;
    }
};

export const useAuth = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem('token');
    const isValid = isTokenValid(token);


    if (token && !isValid) {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
    }

    const isLoggedIn = isValid;

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userName');
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('user');
                    navigate('/auth/login');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [navigate]);

    const login = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const loginData = Object.fromEntries(formData);

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', loginData);
            
            const newToken = response.data.token;
            localStorage.setItem('token', newToken);
            localStorage.setItem('userName', response.data.name);
            localStorage.setItem('isLoggedIn', 'true'); 
            
            const pendingCardString = localStorage.getItem('pendingRecommendation');
            if (pendingCardString) {
                try {
                    const pendingCard = JSON.parse(pendingCardString);
                    
                    await axios.post('http://localhost:8080/api/cabinet', pendingCard, {
                        headers: { Authorization: `Bearer ${newToken}` }
                    });
                    
                    localStorage.removeItem('pendingRecommendation');
                    console.log("Відкладена рекомендація успішно збережена!");
                } catch (saveError) {
                    console.error("Не вдалося зберегти відкладену рекомендацію", saveError);
                }
            }

            navigate('/cabinet');
        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                setError('Неправильний емайл або пароль! Спробуйте ще раз.');
            } else {
                setError('Проблема зі з\'єднанням. Перевірте, чи запущений бекенд.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const registerData = Object.fromEntries(formData);

        try {
            await axios.post('http://localhost:8080/api/auth/register', registerData);
            navigate('/auth/login'); 
        } catch (err: any) {
            if (err.response && err.response.status === 400) {
                setError('Такий емайл вже використовується!');
            } else {
                setError('Сталася помилка при реєстрації. Спробуйте пізніше.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        
        navigate('/'); 
    };

    return { login, register, logout, isLoading, error, isLoggedIn };
};