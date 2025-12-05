import React from 'react';
import { Play, CheckCircle, Shield, Award, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
      
      {/* Navbar Transparente com Gradiente Suave e Máscara de Blur */}
      <nav 
        className="fixed w-full z-50 top-0 px-6 py-6 backdrop-blur-md bg-gradient-to-b from-black/90 via-black/60 to-transparent transition-all duration-300"
        style={{
          maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-white font-bold text-sm">IM</span>
            </div>
            <span className="font-bold text-xl tracking-tight">
              INSPETOR<span className="text-orange-500">MASTER</span>
            </span>
          </div>
          <button
            onClick={onLoginClick}
            className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
          >
            Área do Aluno
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full z-0 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-wide uppercase mb-8 animate-fadeIn">
            <Shield className="w-3 h-3" />
            Certificação SNQC - ABRACO
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Domine a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Inspeção Industrial</span><br />
            e Eleve sua Carreira.
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            A plataforma definitiva para formação de Inspetores de Pintura Nível 1. 
            Tecnologia, prática e conformidade técnica em um só lugar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button 
              onClick={onLoginClick}
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-600/20 transition-all duration-300 hover:translate-y-[-2px] flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" />
              Começar Agora
            </button>
            <button className="w-full sm:w-auto bg-[#1A1A1A] hover:bg-[#252525] border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2">
              Ver Ementa
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Video Section */}
          <div className="relative w-full max-w-5xl mx-auto aspect-video bg-black/50 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-orange-500/10 backdrop-blur-sm group">
            <iframe
              className="w-full h-full object-cover"
              src="https://www.youtube.com/embed/LGD5VHKKXr4?rel=0"
              title="Vídeo Introdutório Inspetor Master"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="py-24 bg-[#0A0A0A] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle className="w-6 h-6 text-orange-500" />,
                title: "Conformidade Total",
                desc: "Conteúdo 100% alinhado com as normas Petrobras N-13, N-9 e ISO internacionais."
              },
              {
                icon: <Award className="w-6 h-6 text-orange-500" />,
                title: "Certificação Prática",
                desc: "Simuladores de inspeção visual e instrumentação para preparar você para o campo."
              },
              {
                icon: <Shield className="w-6 h-6 text-orange-500" />,
                title: "Mentor IA Exclusivo",
                desc: "Tire dúvidas técnicas 24/7 com nosso assistente treinado nas normas vigentes."
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-orange-500/30 transition-all duration-300">
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Minimalista */}
      <footer className="py-12 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <span className="font-bold text-lg">INSPETOR<span className="text-orange-500">MASTER</span></span>
          </div>
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Inspetor Master. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

