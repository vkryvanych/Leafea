import { useState } from 'react';

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
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const message = formData.get('message') as string;

        try {
            console.log('Sending to backend:', { name, email, phone, message });

            await new Promise(resolve => setTimeout(resolve, 1500)); 
            
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