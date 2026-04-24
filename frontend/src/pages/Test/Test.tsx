import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import { useTestLogic } from '../../hooks/useTestLogic';
import CategorySelector from '../../components/CategorySelector/CategorySelector';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import RecommendationCard from '../../components/RecommendationCard/RecommendationCard'; 
import diamantImg from '../../assets/diamant.png'; 
import butterflyImg from '../../assets/butter_test.png'; 
import './Test.css';

export default function Test() {
    const { 
        category, currentStep, answers, isLoading, isFinished, 
        recommendation, noMatch, 
        questions, isFetchingQuestions, 
        startTest, toggleAnswer, nextStep, prevStep, finishTest, resetTest 
    } = useTestLogic();

    return (
        <div className="test-page-wrapper">
            {!isLoading && !isFinished && !isFetchingQuestions && (
                <img src={butterflyImg} alt="" className="test-butterfly" />
            )}

            {!category ? (
                <CategorySelector onSelect={startTest} />
            ) : isFetchingQuestions ? (
                null
            ) : (
                <TestFlow 
                    category={category} 
                    currentStep={currentStep} 
                    answers={answers} 
                    isLoading={isLoading} 
                    isFinished={isFinished}
                    recommendation={recommendation} 
                    noMatch={noMatch}   
                    questions={questions} 
                    toggleAnswer={toggleAnswer} 
                    nextStep={nextStep} 
                    prevStep={prevStep} 
                    finishTest={finishTest}
                    resetTest={resetTest} 
                />
            )}
        </div>
    );
}

function TestFlow({ 
    category, currentStep, answers, isLoading, isFinished, 
    recommendation, noMatch, questions, 
    toggleAnswer, nextStep, prevStep, finishTest, resetTest 
}: any) {
    if (!questions || questions.length === 0) {
        return null;
    }

    const currentQuestion = questions[currentStep];

    const [noMoreOptions, setNoMoreOptions] = useState(false);
    
    const navigate = useNavigate();
    const API_URL = 'http://localhost:8080/api/cabinet';

    const handleAnotherOption = () => {
        setNoMoreOptions(true);
    };

    const handleSaveToCabinet = async (data: any) => {
        const findInDetails = (labelName: string) => {
            return data.details?.find((d: any) => d.label.toLowerCase().includes(labelName.toLowerCase()))?.value || '';
        };

        const checkLeftLabel = (labelName: string) => {
            return data.bottomLeftLabel?.toLowerCase().includes(labelName.toLowerCase()) ? data.bottomLeftText : '';
        };

        let finalCreator = '';
        if (category === 'movie' || category === 'series') {
            finalCreator = findInDetails('режисер'); 
        } else if (category === 'book') {
            finalCreator = checkLeftLabel('автор') || findInDetails('автор');
        } else if (category === 'anime') {
            finalCreator = checkLeftLabel('студія') || findInDetails('студія');
        }

        const getAmountCount = () => {
            const rawValue = findInDetails('сторінок') || findInDetails('епізоди') || findInDetails('серії') || findInDetails('сезон') || '';
            const match = rawValue.match(/\d+/); 
            return match ? parseInt(match[0], 10) : 0;
        };

        const posterImage = (data.galleryImages && data.galleryImages.length > 0) 
            ? data.galleryImages[0] 
            : data.backgroundImage;

        const newCard = {
            title: data.title,
            image: posterImage, 
            category: category,
            creator: finalCreator,
            genres: findInDetails('жанр') || data.genres?.[0] || 'Невідомо',
            status: 'planned',
            totalAmount: getAmountCount(),
            currentProgress: 0,
            quotes: []
        };

        const token = localStorage.getItem('token');
        if (!token) {
            localStorage.setItem('pendingRecommendation', JSON.stringify(newCard));
            navigate('/auth/login'); 
            return; 
        }

        const getConfig = () => ({
            headers: { Authorization: `Bearer ${token}` }
        });

        try {
            await axios.post(API_URL, newCard, getConfig());
            console.log("Успішно збережено!");
        } catch (error) {
            console.error("Помилка при збереженні з тесту:", error);
        }
    };

    const handleReset = () => {
        setNoMoreOptions(false);
        resetTest();
    };

    if (isLoading) {
        return (
            <div className="test-step-container loader-container">
                <h1 className="test-main-title gem-title">
                    Аналізуємо твої відповіді...
                </h1>
                <img src={diamantImg} alt="Завантаження..." className="bouncing-gem" />
            </div>
        );
    }

    if (isFinished) {
        if (noMatch || noMoreOptions || !recommendation) {
            return (
                <div className="test-step-container result-step test-no-match-message">
                    <h3>Упс. . . Нічого не знайдено</h3>
                    <p>
                        Здається, у нашій базі ще немає рекомендацій, які ідеально підходять під ці критерії, або інші варіанти закінчилися. 
                        Спробуй змінити відповіді!
                    </p>
                    <button className="test-nav-btn" onClick={handleReset}>
                        Пройти тест знову
                    </button>
                </div>
            );
        }

        return (
            <div className="test-step-container result-step">
                <RecommendationCard 
                    data={recommendation} 
                    onRestart={handleReset} 
                    onAnotherOption={handleAnotherOption} 
                    onSave={() => handleSaveToCabinet(recommendation)} 
                />
            </div>
        );
    }

    if (currentQuestion) {
        return (
            <QuestionCard 
                question={currentQuestion}
                currentStep={currentStep}
                totalSteps={questions.length}
                selectedOptions={answers[currentQuestion.questionId || currentQuestion.id] || []}
                onToggle={toggleAnswer}
                onNext={nextStep}
                onPrev={prevStep}
                onReset={resetTest}
                onFinish={finishTest}
            />
        );
    }

    return null;
}