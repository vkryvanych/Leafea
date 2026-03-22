import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const navigate = useNavigate();

    const login = () => {
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/cabinet');
    };

    const register = () => {
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/cabinet');
    };

    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/'); 
    };

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    return { login, register, logout, isLoggedIn };
};