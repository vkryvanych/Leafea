import { useState } from 'react';

export function useTestLogic() {
    const [category, setCategory] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string[]>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const startTest = (selectedCategory: string) => {
        setCategory(selectedCategory);
        setCurrentStep(0);
        setAnswers({});
        setIsLoading(false);
        setIsFinished(false);
    };

    const toggleAnswer = (questionId: string, option: string, isMultiple: boolean) => {
        setAnswers(prev => {
            const currentAnswers = prev[questionId] || [];
            if (!isMultiple) {
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

    const finishTest = () => {
        setIsLoading(true)
        
        setTimeout(() => {
            setIsLoading(false); 
            setIsFinished(true); 
        }, 3000);
    };

    const resetTest = () => { 
        setCategory(null); 
        setCurrentStep(0); 
        setAnswers({}); 
        setIsLoading(false);
        setIsFinished(false);
    };

    return { 
        category, currentStep, answers, isLoading, isFinished, 
        startTest, toggleAnswer, nextStep, prevStep, finishTest, resetTest 
    };
}