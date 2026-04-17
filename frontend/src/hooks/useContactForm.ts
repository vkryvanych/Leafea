import { useState } from 'react';
import axios from 'axios';

export const useContactForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        const formData = new FormData(e.currentTarget);
        const contactData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            message: formData.get('message') as string,
        };

        try {
            await axios.post('http://localhost:8080/api/contact/send', contactData);

            setIsSuccess(true);
            e.currentTarget.reset(); 
        } catch (err) {
            setError('Сталася помилка при відправці! Спробуйте ще раз.');
        } finally {
            setIsLoading(false);
        }
    };

    const resetFormStatus = () => {
        setIsSuccess(false);
        setError(null);
    };

    return { handleSubmit, isLoading, isSuccess, error, resetFormStatus };
};