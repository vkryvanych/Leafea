import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { SyntheticEvent } from 'react';

export const useAuth = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const login = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const loginData = Object.fromEntries(formData);

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', loginData);
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userName', response.data.name);
            localStorage.setItem('isLoggedIn', 'true'); 
            
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

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    return { login, register, logout, isLoading, error, isLoggedIn };
};