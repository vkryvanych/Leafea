import { useState } from 'react';
import axios from 'axios';

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
    
    const [recommendation, setRecommendation] = useState<any>(null);
    const [noMatch, setNoMatch] = useState(false);

    const [questions, setQuestions] = useState<BackendQuestion[]>([]);
    const [isFetchingQuestions, setIsFetchingQuestions] = useState(false);

    const startTest = async (selectedCategory: string) => {
        setCategory(selectedCategory);
        setCurrentStep(0);
        setAnswers({});
        setIsLoading(false);
        setIsFinished(false);
        setRecommendation(null);
        setNoMatch(false);

        setIsFetchingQuestions(true);
        try {
            const token = localStorage.getItem('token');
            const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

            const response = await axios.get(`http://localhost:8080/api/test-questions/${selectedCategory}`, config);
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
                if (currentAnswers.includes(option)) {
                    return { ...prev, [questionId]: [] };
                } else {
                    return { ...prev, [questionId]: [option] };
                }
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

            const response = await axios.post('http://localhost:8080/api/test/match', {
                category: category,
                answers: answers
            }, config);
            
            setRecommendation(response.data);
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

    const resetTest = () => { 
        setCategory(null); 
        setCurrentStep(0); 
        setAnswers({}); 
        setIsLoading(false);
        setIsFinished(false);
        setRecommendation(null);
        setNoMatch(false);
        setQuestions([]); 
    };

    return { 
        category, currentStep, answers, isLoading, isFinished, 
        recommendation, noMatch, 
        questions, isFetchingQuestions, 
        startTest, toggleAnswer, nextStep, prevStep, finishTest, resetTest 
    };
}