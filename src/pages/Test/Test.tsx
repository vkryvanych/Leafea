import { useState } from 'react';
import { useTestLogic } from '../../hooks/useTestLogic';
import { testData } from '../../components/testData/testData';
import CategorySelector from '../../components/CategorySelector/CategorySelector';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import RecommendationCard from '../../components/RecommendationCard/RecommendationCard'; 
import { 
    mockMovieRecommendations, 
    mockBookRecommendations, 
    mockSeriesRecommendations, 
    mockAnimeRecommendations 
} from '../../components/testData/mockRecommendation'; 
import diamantImg from '../../assets/diamant.png'; 
import butterflyImg from '../../assets/butter_test.png'; 
import './Test.css';

export default function Test() {
    const { 
        category, currentStep, answers, isLoading, isFinished, 
        startTest, toggleAnswer, nextStep, prevStep, finishTest, resetTest 
    } = useTestLogic();

    return (
        <div className="test-page-wrapper">
            {!isLoading && !isFinished && (
                <img src={butterflyImg} alt="" className="test-butterfly" />
            )}

            {!category ? (
                <CategorySelector onSelect={startTest} />
            ) : (
                <TestFlow 
                    category={category} 
                    currentStep={currentStep} 
                    answers={answers} 
                    isLoading={isLoading} 
                    isFinished={isFinished}
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

function TestFlow({ category, currentStep, answers, isLoading, isFinished, toggleAnswer, nextStep, prevStep, finishTest, resetTest }: any) {
    const questions = testData[category];
    const currentQuestion = questions[currentStep];

    const [isFetchingNew, setIsFetchingNew] = useState(false);
    const [recIndex, setRecIndex] = useState(0);

    const handleAnotherOption = () => {
        setIsFetchingNew(true);
        setTimeout(() => {
            setRecIndex((prevIndex: number) => prevIndex + 1);
            setIsFetchingNew(false);
        }, 1500); 
    };

    const handleSaveToCabinet = (data: any) => {
        const savedData = localStorage.getItem('myLeafeaCards');
        const currentCards = savedData ? JSON.parse(savedData) : [];

        if (currentCards.some((item: any) => item.title === data.title)) return;

        const findInDetails = (labelName: string) => {
            return data.details.find((d: any) => d.label.toLowerCase().includes(labelName.toLowerCase()))?.value || '';
        };

        const checkLeftLabel = (labelName: string) => {
            return data.bottomLeftLabel.toLowerCase().includes(labelName.toLowerCase()) ? data.bottomLeftText : '';
        };

        let finalCreator = '';
        if (category === 'movie' || category === 'series') {
            finalCreator = findInDetails('режисер'); 
        } else if (category === 'book') {
            finalCreator = checkLeftLabel('автор') || findInDetails('автор');
        } else if (category === 'anime') {
            finalCreator = checkLeftLabel('студія') || findInDetails('студія');
        }

        const getPageCount = () => {
            const rawValue = findInDetails('сторінок') || findInDetails('епізоди') || findInDetails('серії') || findInDetails('сезон');
            const match = rawValue.match(/\d+/); 
            return match ? parseInt(match[0], 10) : 0;
        };

        const posterImage = (data.galleryImages && data.galleryImages.length > 0) 
            ? data.galleryImages[0] 
            : data.backgroundImage;

        const newCard = {
            id: Date.now(),
            title: data.title,
            description: data.description,
            image: posterImage, 
            category: category,
            status: 'planned',
            creator: finalCreator,
            genres: findInDetails('жанр'),
            totalPages: getPageCount(),
            currentPage: 0,
            quotes: []
        };

        const updatedCards = [newCard, ...currentCards];
        localStorage.setItem('myLeafeaCards', JSON.stringify(updatedCards));
    };

    if (isLoading || isFetchingNew) {
        return (
            <div className="test-step-container loader-container">
                <h1 className="test-main-title gem-title">
                    {isFetchingNew ? "Шукаємо інший варіант..." : "Аналізуємо твої відповіді..."}
                </h1>
                <img src={diamantImg} alt="Завантаження..." className="bouncing-gem" />
            </div>
        );
    }

    if (isFinished) {
        let currentArray;
        switch (category) {
            case 'book': currentArray = mockBookRecommendations; break;
            case 'anime': currentArray = mockAnimeRecommendations; break;
            case 'series': currentArray = mockSeriesRecommendations; break;
            case 'movie':
            default: currentArray = mockMovieRecommendations; break;
        }

        const currentData = currentArray[recIndex % currentArray.length];

        return (
            <div className="test-step-container result-step">
                <RecommendationCard 
                    data={currentData} 
                    onRestart={resetTest} 
                    onAnotherOption={handleAnotherOption} 
                    onSave={() => handleSaveToCabinet(currentData)} 
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
                selectedOptions={answers[currentQuestion.id] || []}
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