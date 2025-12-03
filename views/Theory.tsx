import React, { useState } from 'react';
import { CourseCard } from '../components/CourseCard';
import { ModuleDetail } from './ModuleDetail';
import { Tab } from '../types';

interface Module {
  id: string;
  title: string;
  subtitle: string;
  progress: number;
  gradient: string;
}

interface TheoryProps {
  onChangeTab?: (tab: Tab) => void;
}

export const Theory: React.FC<TheoryProps> = ({ onChangeTab = () => {} }) => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  // Módulos ABRACO
  const modules: Module[] = [
    {
      id: 'etg',
      title: 'Exame Teórico Geral (ETG)',
      subtitle: 'Normas & 30 Questões',
      progress: 35,
      gradient: 'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800',
    },
    {
      id: 'ec',
      title: 'Estudo de Casos (EC)',
      subtitle: 'Interpretação, RNC e RIPI',
      progress: 20,
      gradient: 'bg-gradient-to-br from-purple-600 via-purple-700 to-pink-800',
    },
    {
      id: 'pc01-pc08',
      title: 'Inspeção Visual (PC-01 & PC-08)',
      subtitle: 'Mapeamento e Análise de Falhas',
      progress: 45,
      gradient: 'bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800',
    },
    {
      id: 'pc02-pc03',
      title: 'Corrosão e Abrasivos (PC-02 & PC-03)',
      subtitle: 'Intemperismo, Tratamento e Rugosidade',
      progress: 30,
      gradient: 'bg-gradient-to-br from-orange-600 via-red-700 to-rose-800',
    },
    {
      id: 'pc04',
      title: 'Medição de Espessura (PC-04)',
      subtitle: 'Calibração e Película Seca',
      progress: 60,
      gradient: 'bg-gradient-to-br from-amber-600 via-yellow-700 to-orange-800',
    },
    {
      id: 'pc05-pc06-pc07',
      title: 'Testes Físicos (PC-05, 06 & 07)',
      subtitle: 'Aderência, Rugosidade e Holiday Detector',
      progress: 25,
      gradient: 'bg-gradient-to-br from-violet-600 via-purple-700 to-fuchsia-800',
    },
  ];

  // Se um módulo foi selecionado, mostrar detalhes
  if (selectedModule) {
    return (
      <ModuleDetail
        moduleId={selectedModule.id}
        moduleTitle={selectedModule.title}
        moduleSubtitle={selectedModule.subtitle}
        onBack={() => setSelectedModule(null)}
        onChangeTab={onChangeTab}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white dark:text-[#333333] mb-2 transition-colors">Meus Cursos</h1>
        <p className="text-slate-400 dark:text-[#666666] text-lg transition-colors">
          Prepare-se para o exame ABRACO com módulos especializados baseados no Guia do Candidato
        </p>
      </div>

      {/* Grade de Módulos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <CourseCard
            key={module.id}
            id={module.id}
            title={module.title}
            subtitle={module.subtitle}
            progress={module.progress}
            gradient={module.gradient}
            onClick={() => setSelectedModule(module)}
          />
        ))}
      </div>
    </div>
  );
};