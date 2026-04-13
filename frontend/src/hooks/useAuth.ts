import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            console.log('Спроба логіну:', { email, password });
        
            await new Promise(resolve => setTimeout(resolve, 1000));

            localStorage.setItem('isLoggedIn', 'true');
            navigate('/cabinet');
        } catch (err) {
            setError('Неправильний емайл або пароль! Спробуйте ще раз.');
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
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            console.log('Спроба реєстрації:', { name, email, password });
            
            await new Promise(resolve => setTimeout(resolve, 1000));
           
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/cabinet');
        } catch (err) {
            setError('Сталася помилка! Можливо, такий емайл вже існує.');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/'); 
    };

    return { login, register, logout, isLoading, error };
};