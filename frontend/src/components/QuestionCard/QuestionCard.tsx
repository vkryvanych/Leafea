import type { Question } from '../testData/testData';
import './QuestionCard.css';

interface Props {
    question: Question;
    currentStep: number;
    totalSteps: number;
    selectedOptions: string[];
    onToggle: (id: string, option: string, isMultiple: boolean) => void;
    onNext: () => void;
    onPrev: () => void;
    onReset: () => void;
    onFinish: () => void; 
}

export default function QuestionCard({ 
    question, currentStep, totalSteps, selectedOptions, 
    onToggle, onNext, onPrev, onReset, onFinish 
}: Props) {
    const isMultiple = question.type === 'multiple';
    const canGoNext = selectedOptions.length > 0;
    const progressPercent = (currentStep / totalSteps) * 100;
    const isLastQuestion = currentStep === totalSteps - 1;

    return (
        <div className="test-step-container">
            <div className="test-progress-bar">
                <div className="test-progress-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>

            <h2 className="test-question-title">{question.title}</h2>

            <div className={`options-container ${isMultiple ? 'grid-2-cols' : 'grid-1-col'}`}>
                {question.options.map((option) => {
                    const isSelected = selectedOptions.includes(option);
                    return (
                        <button 
                            key={option} 
                            className={`option-btn ${isSelected ? 'selected' : ''}`}
                            onClick={() => onToggle(question.id, option, isMultiple)}
                        >
                            <div className={`custom-checkbox ${isSelected ? 'checked' : ''}`}></div>
                            <span className="option-text">{option}</span>
                        </button>
                    );
                })}
            </div>

            <div className="test-navigation">
                <button className="test-back-btn" onClick={currentStep === 0 ? onReset : onPrev}>
                    ← Назад
                </button>
                
                {canGoNext && (
                    <button 
                        className="test-nav-btn" 
                        onClick={isLastQuestion ? onFinish : onNext}
                    >
                        {isLastQuestion ? 'Отримати результат' : 'Далі →'}
                    </button>
                )}
            </div>
        </div>
    );
}