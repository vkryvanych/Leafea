import { useTestLogic } from '../../hooks/useTestLogic';
import { testData } from '../../components/testData/testData';
import CategorySelector from '../../components/CategorySelector/CategorySelector';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
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

    if (isLoading) {
        return (
            <div className="test-step-container loader-container">
                <h1 className="test-main-title gem-title">Аналізуємо твої відповіді...</h1>
                <img src={diamantImg} alt="Завантаження..." className="bouncing-gem" />
            </div>
        );
    }

    if (isFinished) {
        return (
            <div className="test-step-container">
                <div className="test-progress-bar">
                    <div className="test-progress-fill" style={{ width: '100%' }}></div>
                </div>
                <h1 className="test-main-title">Твоя ідеальна рекомендація:</h1>
                <button className="test-nav-btn" style={{ marginTop: '30px' }} onClick={resetTest}>Пройти ще раз</button>
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