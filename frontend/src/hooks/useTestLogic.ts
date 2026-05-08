import { useState } from 'react';
import axios from 'axios';

const getBaseUrl = () => {
    if (import.meta.env.DEV) {
        return 'http://localhost:8080';
    }
    return import.meta.env.VITE_API_BASE_URL || 'https://leafea-backend.onrender.com';
};
const API_BASE_URL = getBaseUrl();

export type BackendQuestion = {
    questionId: string;
    title: string;
    subtitle?: string;
    type: 'single' | 'multiple';
    options: string[];
};

export function useTestLogic() {
    const [category, setCategory] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string[]>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    
    const [recommendationsList, setRecommendationsList] = useState<any[]>([]);
    const [currentRecIndex, setCurrentRecIndex] = useState(0);
    const [recommendation, setRecommendation] = useState<any>(null);
    const [noMatch, setNoMatch] = useState(false);
    const [questions, setQuestions] = useState<BackendQuestion[]>([]);
    const [isFetchingQuestions, setIsFetchingQuestions] = useState(false);
    const [savedKeys, setSavedKeys] = useState<string[]>([]);

    const startTest = async (selectedCategory: string) => {
        setCategory(selectedCategory);
        setCurrentStep(0);
        setAnswers({});
        setIsLoading(false);
        setIsFinished(false);
        setRecommendation(null);
        setRecommendationsList([]);
        setCurrentRecIndex(0);
        setNoMatch(false);
        setSavedKeys([]);

        setIsFetchingQuestions(true);
        try {
            const token = localStorage.getItem('token');
            const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
            const response = await axios.get(`${API_BASE_URL}/api/test-questions/${selectedCategory}`, config);
            setQuestions(response.data);
        } catch (error) {
            console.error("Помилка завантаження питань:", error);
        } finally {
            setIsFetchingQuestions(false);
        }
    };

    const toggleAnswer = (questionId: string, option: string, isMultiple: boolean) => {
        setAnswers(prev => {
            const currentAnswers = prev[questionId] || [];
            if (!isMultiple) {
                if (currentAnswers.includes(option)) return { ...prev, [questionId]: [] };
                return { ...prev, [questionId]: [option] };
            }
            if (currentAnswers.includes(option)) {
                return { ...prev, [questionId]: currentAnswers.filter(ans => ans !== option) };
            } else {
                return { ...prev, [questionId]: [...currentAnswers, option] };
            }
        });
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => Math.max(0, prev - 1));

    const finishTest = async () => {
        setIsLoading(true);
        setNoMatch(false);
        
        try {
            const token = localStorage.getItem('token');
            const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

            const response = await axios.post(`${API_BASE_URL}/api/test/match`, {
                category: category,
                answers: answers
            }, config);
            
            if (token) {
                try {
                    const cabinetRes = await axios.get(`${API_BASE_URL}/api/cabinet`, config);
                    const keys = cabinetRes.data.map((item: any) => `${item.title}-${item.category}`);
                    setSavedKeys(keys);
                } catch (err) {
                    console.error("Помилка перевірки кабінету:", err);
                }
            }

            const results = response.data;
            if (results && results.length > 0) {
                setRecommendationsList(results);
                setRecommendation(results[0]); 
                setCurrentRecIndex(0);
            } else {
                setNoMatch(true);
            }
            setIsFinished(true);
        } catch (error: any) {
            console.error("Помилка алгоритму:", error);
            if (error.response && error.response.status === 404) {
                setNoMatch(true); 
            }
            setIsFinished(true);
        } finally {
            setIsLoading(false);
        }
    };

    const nextRecommendation = () => {
        const nextIndex = currentRecIndex + 1;
        if (nextIndex < recommendationsList.length) {
            setIsLoading(true);
            setTimeout(() => {
                setCurrentRecIndex(nextIndex);
                setRecommendation(recommendationsList[nextIndex]);
                setIsLoading(false);
            }, 1000); 
            return true; 
        }
        return false; 
    };

    const resetTest = () => { 
        setCategory(null); setCurrentStep(0); setAnswers({}); 
        setIsLoading(false); setIsFinished(false); setRecommendation(null);
        setRecommendationsList([]); setCurrentRecIndex(0); setNoMatch(false);
        setQuestions([]); setSavedKeys([]); 
    };

    const markAsSavedLocally = (title: string, itemCategory: string) => {
        setSavedKeys(prev => [...prev, `${title}-${itemCategory}`]);
    };

    return { 
        category, currentStep, answers, isLoading, isFinished, 
        recommendation, noMatch, questions, isFetchingQuestions, 
        startTest, toggleAnswer, nextStep, prevStep, finishTest, resetTest,
        nextRecommendation, 
        savedKeys, markAsSavedLocally 
    };
}