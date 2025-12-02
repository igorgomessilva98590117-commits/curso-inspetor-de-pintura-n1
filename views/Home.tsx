import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { Tab } from '../types';
import { ContentTrack } from '../components/ContentTrack';
import { EthicsBadge } from '../components/EthicsBadge';

export const Home: React.FC<{ onChangeTab: (t: Tab) => void }> = ({ onChangeTab }) => {
  // Progresso simulado - em produção viria de um estado/contexto
  const overallProgress = 35;

  // Dados das trilhas de conteúdo
  const continueWatching = [
    {
      id: 'theory-1',
      title: 'Normas PETROBRAS: N-13 - Requisitos Técnicos',
      thumbnail: '',
      duration: '45 min',
      progress: 65,
      completed: false,
      onClick: () => onChangeTab(Tab.THEORY),
    },
    {
      id: 'lab-1',
      title: 'Instrumentação: Medição de Espessura',
      thumbnail: '',
      duration: '30 min',
      progress: 0,
      completed: false,
      onClick: () => onChangeTab(Tab.LAB),
    },
  ];

  const theoreticalModules = [
    {
      id: 'theory-n13',
      title: 'N-13: Requisitos Técnicos para Serviços de Pintura',
      thumbnail: '',
      duration: '45 min',
      progress: 65,
      completed: false,
      onClick: () => onChangeTab(Tab.THEORY),
    },
    {
      id: 'theory-n9',
      title: 'N-9: Tratamento de Superfície',
      thumbnail: '',
      duration: '40 min',
      progress: 0,
      completed: false,
      onClick: () => onChangeTab(Tab.THEORY),
    },
    {
      id: 'theory-n2',
      title: 'N-2: Pintura de Equipamentos Industriais',
      thumbnail: '',
      duration: '50 min',
      progress: 0,
      completed: false,
      onClick: () => onChangeTab(Tab.THEORY),
    },
    {
      id: 'theory-schemes',
      title: 'Esquemas de Pintura: Seleção e Aplicação',
      thumbnail: '',
      duration: '35 min',
      progress: 0,
      completed: false,
      onClick: () => onChangeTab(Tab.THEORY),
    },
  ];

  const practicalLab = [
    {
      id: 'lab-thickness',
      title: 'Medição de Espessura: Uso do Pêndulo',
      thumbnail: '',
      duration: '30 min',
      progress: 0,
      completed: false,
      onClick: () => onChangeTab(Tab.LAB),
    },
    {
      id: 'lab-adhesion',
      title: 'Teste de Aderência: Pull-Off',
      thumbnail: '',
      duration: '25 min',
      progress: 0,
      completed: false,
      onClick: () => onChangeTab(Tab.LAB),
    },
    {
      id: 'lab-holiday',
      title: 'Holiday Detector: Detecção de Falhas',
      thumbnail: '',
      duration: '20 min',
      progress: 0,
      completed: false,
      onClick: () => onChangeTab(Tab.LAB),
    },
    {
      id: 'lab-visual',
      title: 'Inspeção Visual: Padrões e Critérios',
      thumbnail: '',
      duration: '35 min',
      progress: 0,
      completed: false,
      onClick: () => onChangeTab(Tab.LAB),
    },
  ];

  const caseStudies = [
    {
      id: 'case-27',
      title: 'Cenário A: Tanque de Nafta',
      thumbnail: '',
      duration: '15 min',
      progress: 0,
      completed: false,
      onClick: () => onChangeTab(Tab.CASES),
    },
    {
      id: 'case-28',
      title: 'Cenário B: Ponte Rolante',
      thumbnail: '',
      duration: '15 min',
      progress: 0,
      completed: false,
      onClick: () => onChangeTab(Tab.CASES),
    },
    {
      id: 'case-18',
      title: 'Cenário C: Tubulação Industrial',
      thumbnail: '',
      duration: '15 min',
      progress: 0,
      completed: false,
      onClick: () => onChangeTab(Tab.CASES),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Estilo Cinema */}
      <div className="relative h-[70vh] min-h-[500px] mb-12 rounded-2xl overflow-hidden border border-[#1a1a1a]">
        {/* Background Image Placeholder com Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0a0a0a] to-slate-900">
          {/* Simulação de imagem de fundo com padrão industrial */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
          </div>
          {/* Overlay escuro */}
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Conteúdo da Hero */}
        <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-12">
          <div className="max-w-4xl">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Bem-vindo, <span className="text-amber-500">Futuro Inspetor</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-200 mb-8 leading-relaxed max-w-3xl">
              Mais que um Inspetor, um <span className="text-amber-500 font-semibold">Guardião da Integridade</span>. 
              A Inspeção de Pintura não é apenas estética; é a linha de defesa contra o colapso industrial. 
              Aqui, transformamos normas técnicas em poder de decisão. Você prevenirá falhas, salvará milhões em ativos e protegerá vidas.
            </p>

            {/* Barra de Progresso */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300 text-sm font-medium">Progresso Geral do Curso</span>
                <span className="text-amber-500 font-bold text-lg">{overallProgress}%</span>
              </div>
              <div className="h-3 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full transition-all duration-500 shadow-lg shadow-amber-500/50"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onChangeTab(Tab.THEORY)}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-xl shadow-amber-500/30 flex items-center gap-2 group"
              >
                <Play className="w-5 h-5" />
                Iniciar Treinamento
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onChangeTab(Tab.CASES)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 border border-white/20"
              >
                Ver Estudos de Casos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trilhas de Conteúdo */}
      <div className="space-y-8">
        {continueWatching.length > 0 && (
          <ContentTrack 
            title="Continue de onde parou" 
            items={continueWatching}
            featured={true}
          />
        )}

        <ContentTrack 
          title="Módulos Teóricos: Normas e Fundamentos" 
          items={theoreticalModules}
        />

        <ContentTrack 
          title="Laboratório Prático: Instrumentação" 
          items={practicalLab}
        />

        <ContentTrack 
          title="Estudos de Casos: Cenários Reais" 
          items={caseStudies}
        />
      </div>

      {/* Selo de Ética */}
      <EthicsBadge />
    </div>
  );
};
