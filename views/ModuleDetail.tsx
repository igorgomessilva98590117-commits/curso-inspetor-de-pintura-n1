import React, { useState } from 'react';
import { ArrowLeft, Play, CheckCircle2, Clock, BookOpen } from 'lucide-react';
import { Tab } from '../types';

interface ModuleDetailProps {
  moduleId: string;
  moduleTitle: string;
  moduleSubtitle: string;
  onBack: () => void;
  onChangeTab: (tab: Tab) => void;
}

interface VideoLesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

interface Quiz {
  id: string;
  title: string;
  questions: number;
  completed: boolean;
  score?: number;
}

export const ModuleDetail: React.FC<ModuleDetailProps> = ({
  moduleId,
  moduleTitle,
  moduleSubtitle,
  onBack,
  onChangeTab,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Dados simulados - em produção viriam de uma API
  const videoLessons: VideoLesson[] = [
    { id: '1', title: 'Introdução ao Módulo', duration: '15 min', completed: true },
    { id: '2', title: 'Conceitos Fundamentais', duration: '25 min', completed: true },
    { id: '3', title: 'Aplicação Prática', duration: '30 min', completed: false },
    { id: '4', title: 'Casos de Estudo', duration: '20 min', completed: false },
  ];

  const quizzes: Quiz[] = [
    { id: '1', title: 'Quiz 1: Conceitos Básicos', questions: 10, completed: true, score: 85 },
    { id: '2', title: 'Quiz 2: Aplicação Prática', questions: 15, completed: false },
    { id: '3', title: 'Prova Final do Módulo', questions: 30, completed: false },
  ];

  const progress = Math.round(
    ((videoLessons.filter(v => v.completed).length + quizzes.filter(q => q.completed).length) /
      (videoLessons.length + quizzes.length)) *
      100
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para Meus Cursos
        </button>
        <h1 className="text-4xl font-bold text-white mb-2">{moduleTitle}</h1>
        <p className="text-slate-400 text-lg">{moduleSubtitle}</p>
        
        {/* Progresso */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 text-sm font-medium">Progresso do Módulo</span>
            <span className="text-amber-500 font-bold">{progress}%</span>
          </div>
          <div className="h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Videoaulas */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Play className="w-6 h-6 text-amber-500" />
          <h2 className="text-2xl font-bold text-white">Videoaulas</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {videoLessons.map((video) => (
            <div
              key={video.id}
              className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-amber-500 transition-colors cursor-pointer group"
              onClick={() => setSelectedVideo(video.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-white ml-1" fill="white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-400">{video.duration}</span>
                    </div>
                  </div>
                </div>
                {video.completed && (
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Provas e Quizzes */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-amber-500" />
          <h2 className="text-2xl font-bold text-white">Provas e Quizzes</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-amber-500 transition-colors cursor-pointer group"
              onClick={() => {
                // Navegar para a prova
                onChangeTab(Tab.CASES);
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                    {quiz.title}
                  </h3>
                  <p className="text-sm text-slate-400">{quiz.questions} questões</p>
                  {quiz.score && (
                    <p className="text-sm text-amber-500 mt-2 font-semibold">
                      Nota: {quiz.score}%
                    </p>
                  )}
                </div>
                {quiz.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                ) : (
                  <div className="w-6 h-6 border-2 border-slate-600 rounded-full flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Player de Vídeo (quando selecionado) */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="text-white mb-4 hover:text-amber-500 transition-colors"
            >
              Fechar
            </button>
            <div className="bg-slate-900 rounded-lg p-4">
              <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
                <p className="text-slate-400">Player de Vídeo - {videoLessons.find(v => v.id === selectedVideo)?.title}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



