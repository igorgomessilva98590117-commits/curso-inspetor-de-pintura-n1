import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, AlertCircle, Clock, Award } from 'lucide-react';

interface AnswerOption {
  text: string;
  rationale: string;
  isCorrect: boolean;
}

interface Question {
  questionNumber: number;
  question: string;
  hint: string;
  answerOptions: AnswerOption[];
}

interface ExamData {
  title: string;
  questions: Question[];
}

interface ExamInterfaceProps {
  examData: ExamData;
  onClose: () => void;
}

export const ExamInterface: React.FC<ExamInterfaceProps> = ({ examData, onClose }) => {
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHints, setShowHints] = useState<{ [key: number]: boolean }>({});

  const handleAnswerSelect = (questionNumber: number, optionIndex: number) => {
    if (!isSubmitted) {
      setUserAnswers({
        ...userAnswers,
        [questionNumber]: optionIndex,
      });
    }
  };

  const toggleHint = (questionNumber: number) => {
    setShowHints({
      ...showHints,
      [questionNumber]: !showHints[questionNumber],
    });
  };

  const handleSubmit = () => {
    if (Object.keys(userAnswers).length < examData.questions.length) {
      alert('Por favor, responda todas as questões antes de submeter.');
      return;
    }
    setIsSubmitted(true);
  };

  const calculateScore = () => {
    let correct = 0;
    examData.questions.forEach((question) => {
      const userAnswer = userAnswers[question.questionNumber];
      if (userAnswer !== undefined && question.answerOptions[userAnswer]?.isCorrect) {
        correct++;
      }
    });
    return {
      correct,
      total: examData.questions.length,
      percentage: Math.round((correct / examData.questions.length) * 100),
    };
  };

  const score = isSubmitted ? calculateScore() : null;

  return (
    <div className="fixed inset-0 bg-black/95 dark:bg-white/95 z-50 overflow-y-auto">
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-t-2xl p-6 sticky top-0 z-10 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {examData.title}
                </h1>
                <p className="text-white/90 text-sm md:text-base">
                  {examData.questions.length} questões
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Resultado */}
          {isSubmitted && score && (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-50 dark:to-slate-100 border-2 border-amber-500 rounded-lg p-6 mb-6 mt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white dark:text-slate-900 mb-1">Prova Finalizada!</h2>
                  <p className="text-slate-300 dark:text-slate-600">Confira seu desempenho abaixo</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-[#0a0a0a] dark:bg-white rounded-lg p-4 text-center">
                  <p className="text-slate-400 dark:text-slate-600 text-sm mb-1">Acertos</p>
                  <p className="text-3xl font-bold text-green-500">{score.correct}</p>
                </div>
                <div className="bg-[#0a0a0a] dark:bg-white rounded-lg p-4 text-center">
                  <p className="text-slate-400 dark:text-slate-600 text-sm mb-1">Erros</p>
                  <p className="text-3xl font-bold text-red-500">{score.total - score.correct}</p>
                </div>
                <div className="bg-[#0a0a0a] dark:bg-white rounded-lg p-4 text-center">
                  <p className="text-slate-400 dark:text-slate-600 text-sm mb-1">Nota Final</p>
                  <p className="text-3xl font-bold text-amber-500 dark:text-orange-600">{score.percentage}%</p>
                </div>
              </div>
              {score.percentage >= 70 ? (
                <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <p className="text-green-400 dark:text-green-600 font-semibold text-center">
                    ✅ Aprovado! Parabéns pelo seu desempenho!
                  </p>
                </div>
              ) : (
                <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-400 dark:text-red-600 font-semibold text-center">
                    ❌ Reprovado. Continue estudando e tente novamente!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Questões */}
          <div className="bg-[#0a0a0a] dark:bg-white rounded-b-2xl border border-[#1a1a1a] dark:border-slate-200">
            {examData.questions.map((question, qIndex) => {
              const userAnswer = userAnswers[question.questionNumber];
              const isAnswered = userAnswer !== undefined;

              return (
                <div
                  key={question.questionNumber}
                  className="border-b border-[#1a1a1a] dark:border-slate-200 last:border-b-0 p-6 md:p-8"
                >
                  {/* Pergunta */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{question.questionNumber}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-semibold text-white dark:text-slate-900 mb-3">
                        {question.question}
                      </h3>
                      
                      {/* Hint Button */}
                      <button
                        onClick={() => toggleHint(question.questionNumber)}
                        className="text-sm text-amber-500 dark:text-orange-600 hover:text-amber-400 dark:hover:text-orange-500 flex items-center gap-2 transition-colors"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {showHints[question.questionNumber] ? 'Ocultar dica' : 'Ver dica'}
                      </button>
                      
                      {/* Hint */}
                      {showHints[question.questionNumber] && (
                        <div className="mt-3 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                          <p className="text-amber-300 dark:text-amber-700 text-sm">
                            💡 <strong>Dica:</strong> {question.hint}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Opções de Resposta */}
                  <div className="space-y-3 ml-14">
                    {question.answerOptions.map((option, optionIndex) => {
                      const isSelected = userAnswer === optionIndex;
                      const isCorrect = option.isCorrect;
                      const showCorrection = isSubmitted;

                      let bgColor = 'bg-[#141414] dark:bg-slate-50 hover:bg-[#1a1a1a] dark:hover:bg-slate-100';
                      let borderColor = 'border-[#2a2a2a] dark:border-slate-300';
                      let textColor = 'text-slate-300 dark:text-slate-700';

                      if (showCorrection) {
                        if (isCorrect) {
                          bgColor = 'bg-green-500/10 dark:bg-green-50';
                          borderColor = 'border-green-500/50 dark:border-green-400';
                          textColor = 'text-green-400 dark:text-green-700';
                        } else if (isSelected && !isCorrect) {
                          bgColor = 'bg-red-500/10 dark:bg-red-50';
                          borderColor = 'border-red-500/50 dark:border-red-400';
                          textColor = 'text-red-400 dark:text-red-700';
                        }
                      } else if (isSelected) {
                        bgColor = 'bg-amber-500/10 dark:bg-amber-50';
                        borderColor = 'border-amber-500/50 dark:border-amber-400';
                        textColor = 'text-amber-400 dark:text-amber-700';
                      }

                      return (
                        <div key={optionIndex}>
                          <button
                            onClick={() => handleAnswerSelect(question.questionNumber, optionIndex)}
                            disabled={isSubmitted}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${bgColor} ${borderColor} ${
                              isSubmitted ? 'cursor-default' : 'cursor-pointer'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {/* Radio Button */}
                              <div className="mt-1">
                                {showCorrection ? (
                                  isCorrect ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                  ) : isSelected ? (
                                    <XCircle className="w-5 h-5 text-red-500" />
                                  ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-slate-600" />
                                  )
                                ) : (
                                  <div
                                    className={`w-5 h-5 rounded-full border-2 transition-colors ${
                                      isSelected
                                        ? 'border-amber-500 bg-amber-500'
                                        : 'border-slate-600'
                                    }`}
                                  >
                                    {isSelected && (
                                      <div className="w-full h-full rounded-full bg-white scale-50" />
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Texto da Opção */}
                              <div className="flex-1">
                                <p className={`font-medium ${textColor}`}>{option.text}</p>
                                
                                {/* Rationale (só aparece após submeter) */}
                                {showCorrection && (isCorrect || isSelected) && (
                                  <div className="mt-3 pt-3 border-t border-slate-700 dark:border-slate-300">
                                    <p className="text-sm text-slate-400 dark:text-slate-600">
                                      <strong className={isCorrect ? 'text-green-400 dark:text-green-700' : 'text-red-400 dark:text-red-700'}>
                                        {isCorrect ? '✅ Explicação:' : '❌ Por que está errado:'}
                                      </strong>{' '}
                                      {option.rationale}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Botão de Submeter */}
          {!isSubmitted && (
            <div className="mt-6 sticky bottom-4">
              <button
                onClick={handleSubmit}
                disabled={Object.keys(userAnswers).length < examData.questions.length}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-slate-700 disabled:to-slate-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:cursor-not-allowed"
              >
                {Object.keys(userAnswers).length < examData.questions.length
                  ? `Responda todas as questões (${Object.keys(userAnswers).length}/${examData.questions.length})`
                  : 'Finalizar e Ver Resultado'}
              </button>
            </div>
          )}

          {/* Botão de Fechar após submeter */}
          {isSubmitted && (
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => {
                  setUserAnswers({});
                  setIsSubmitted(false);
                  setShowHints({});
                }}
                className="flex-1 bg-slate-700 dark:bg-slate-300 hover:bg-slate-600 dark:hover:bg-slate-400 text-white dark:text-slate-900 font-bold py-4 px-6 rounded-xl transition-colors"
              >
                Refazer Prova
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all"
              >
                Voltar aos Cursos
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

