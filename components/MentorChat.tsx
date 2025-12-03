import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertTriangle, Lightbulb } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'mentor';
  content: string;
  timestamp: Date;
}

export const MentorChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'mentor',
      content: 'Olá! Eu sou o Mentor Inspetor Master, seu tutor especializado em Inspeção de Pintura Industrial e Corrosão. Estou aqui para prepará-lo para a certificação SNQC da ABRACO.\n\nComo posso ajudá-lo hoje?\n• Tire dúvidas sobre normas técnicas\n• Peça questões de prova estilo SNQC\n• Aprenda sobre instrumentação e ensaios\n• Entenda mecanismos de corrosão',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulação de resposta do mentor (em produção, isso seria uma chamada à API)
    setTimeout(() => {
      const mentorResponse = generateMentorResponse(userMessage.content);
      const mentorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'mentor',
        content: mentorResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, mentorMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const generateMentorResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    // Respostas pré-definidas baseadas nas diretrizes
    if (lowerInput.includes('intemperismo') || lowerInput.includes('grau')) {
      return `**Intemperismo** é o conjunto de processos mecânicos, químicos e biológicos que ocasionam a decomposição e desintegração das rochas. No nosso contexto de pintura, refere-se ao ataque atmosférico ao aço.

Lembre-se da norma **ISO 8501-1**:

• **Grau A**: Superfície com carepa de laminação intacta
• **Grau B**: Início de ferrugem e desprendimento da carepa
• **Grau C**: Carepa removida pela ferrugem, pites visíveis a olho nu
• **Grau D**: Corrosão generalizada com pites profundos

💡 **Dica de Prova**: Não confunda Grau B com C. A chave é a presença de pites visíveis no Grau C.

Recomendo revisar a aula sobre Preparação de Superfície no módulo teórico.`;
    }

    if (lowerInput.includes('questão') || lowerInput.includes('pergunta') || lowerInput.includes('prova')) {
      return `Vou gerar uma questão estilo SNQC para você:

**Questão:** Segundo a norma ISO 8501-1, qual grau de intemperismo apresenta pites visíveis a olho nu?

a) Grau A
b) Grau B
c) Grau C ✓
d) Grau D

**Resposta Correta: C**

**Explicação:** O Grau C é caracterizado pela remoção da carepa pela ferrugem, com pites visíveis a olho nu. No Grau B, há apenas início de ferrugem sem pites visíveis.

💡 **Dica de Prova**: Questões sobre graus de intemperismo são muito comuns. Memorize a sequência: A (intacta) → B (início) → C (pites) → D (generalizada).

Quer mais uma questão sobre outro tópico?`;
    }

    if (lowerInput.includes('ponto de orvalho') || lowerInput.includes('orvalho')) {
      return `**Ponto de Orvalho** é a temperatura na qual o vapor d'água presente no ar se condensa, formando gotículas de água.

**Analogia Prática:** É como quando você respira no vidro do carro em um dia frio - o vapor da sua respiração condensa porque a superfície do vidro está abaixo do ponto de orvalho.

**Na Pintura Industrial:**
• A temperatura da superfície deve estar **pelo menos 3°C acima** do ponto de orvalho
• Isso evita condensação durante a aplicação da tinta
• Use o **termo-higrômetro** para medir temperatura ambiente, umidade relativa e calcular o ponto de orvalho

**Fórmula prática:** Td = T - ((100 - UR) / 5)
Onde: Td = ponto de orvalho, T = temperatura ambiente, UR = umidade relativa

💡 **Dica de Prova**: A diferença mínima de 3°C é uma pegadinha comum. Muitos alunos esquecem esse detalhe crítico.

**Segurança:** Nunca aplique tinta com a superfície abaixo do ponto de orvalho - isso causará falhas de aderência e corrosão prematura.`;
    }

    if (lowerInput.includes('aderência') || lowerInput.includes('pull-off')) {
      return `**Aderência** é a força de ligação entre a tinta e o substrato. É medida através de ensaios destrutivos.

**Normas de Referência:**
• ISO 4624 (Pull-Off)
• ASTM D4541

**Métodos de Ensaio:**
1. **Pull-Off (Corte em X ou Grade)**: Usa um adesivo e um dinamômetro
2. **Corte em X (Cross-Cut)**: Avaliação visual após corte com lâmina
3. **Pull-Off com equipamento**: Medição precisa em MPa

**Critérios de Aprovação (geral):**
• Mínimo 5 MPa para sistemas de pintura industrial
• Verificar sempre a especificação do projeto

💡 **Dica de Prova**: Questões sobre valores mínimos de aderência são frequentes. Memorize: 5 MPa é o padrão mínimo para pintura industrial.

**Na Obra:** Sempre verifique a aderência antes de aplicar camadas subsequentes. Falhas de aderência são um dos principais defeitos de pintura.`;
    }

    if (lowerInput.includes('holiday') || lowerInput.includes('descontinuidade')) {
      return `**Holiday Detector** (Detector de Descontinuidades) é um equipamento que identifica falhas na película de tinta através de corrente elétrica.

**Princípio:** A corrente elétrica passa através de falhas na película isolante, indicando descontinuidades.

**Tipos:**
• **Baixa Voltagem** (9-90V): Para películas finas (< 500µm)
• **Alta Voltagem** (900-15.000V): Para películas espessas (> 500µm)

**Norma de Referência:** NACE SP0188 / ASTM D5162

**Procedimento:**
1. Calibrar o equipamento
2. Aplicar o eletrodo na superfície
3. Mover em velocidade constante (0,3 m/s)
4. Sinal sonoro/visual indica falha

💡 **Dica de Prova**: A diferença entre baixa e alta voltagem é baseada na espessura da película. Questões sobre isso são comuns.

**Segurança:** Use EPIs adequados ao trabalhar com alta voltagem.`;
    }

    if (lowerInput.includes('rugosidade') || lowerInput.includes('rugosímetro')) {
      return `**Rugosidade** é a medida da textura superficial após jateamento. É fundamental para a aderência da tinta.

**Parâmetros Principais:**
• **Ra**: Rugosidade média aritmética (mais comum)
• **Rz**: Rugosidade média entre picos e vales

**Norma de Referência:** ISO 8503

**Padrões Comparativos:**
• G: Grit (abrasivo)
• S: Shot (granalha)
• GS: Grit e Shot combinados

**Valores Típicos:**
• Jateamento fino: Ra 25-50 µm
• Jateamento médio: Ra 50-100 µm
• Jateamento grosso: Ra 100-150 µm

**Medição:**
• Rugosímetro portátil
• Comparadores visuais (padrões Rugotest)

💡 **Dica de Prova**: Rugosidade é medida em micrômetros (µm). Valores muito altos ou muito baixos podem causar problemas de aderência.

**Na Obra:** A rugosidade deve ser medida em vários pontos e documentada no relatório de inspeção.`;
    }

    if (lowerInput.includes('espessura') || lowerInput.includes('pêndulo') || lowerInput.includes('pc-04')) {
      return `**Medição de Espessura de Película Seca (DFT)** é uma das inspeções mais críticas.

**Equipamento:** Medidor de espessura (pêndulo) - Tipo 1 ou Tipo 2

**Norma de Referência:** ISO 2808 / NBR 14615

**Procedimento (PC-04):**
1. **Calibração**: Em base metálica lisa (placas de calibração)
2. **Medição**: Em grade de 30x30 cm, mínimo 5 pontos
3. **Cálculo**: Média aritmética dos valores
4. **Critério**: ±20% da especificação (geralmente)

**Fator de Correção:**
• Aplicar quando a base não for metálica
• Fórmula: Espessura Real = Leitura - Fator de Correção

💡 **Dica de Prova**: O fator de correção é uma pegadinha comum. Sempre verifique se a base é metálica antes de aplicar.

**Na Obra:** Documente todas as medições. Valores fora da especificação exigem correção (rejateamento e repintura).`;
    }

    if (lowerInput.includes('corrosão') || lowerInput.includes('mecanismo')) {
      return `**Corrosão** é a deterioração de um material por ação química ou eletroquímica do meio ambiente.

**Mecanismos Principais:**

1. **Corrosão Eletroquímica** (mais comum em aço)
   • Anodo: Área que perde elétrons (oxidação)
   • Catodo: Área que ganha elétrons (redução)
   • Eletrólito: Meio condutor (água, umidade)

2. **Corrosão Química**
   • Reação direta com o meio
   • Sem necessidade de eletrólito

**Tipos de Corrosão:**
• **Uniforme**: Ataque generalizado
• **Localizada**: Pites, frestas, galvânica
• **Intergranular**: Ao longo dos grãos do metal

**Proteção por Pintura:**
• **Barreira**: Isolamento físico
• **Inibição**: Aditivos que retardam corrosão
• **Sacrificial**: Zinco (galvanização)

💡 **Dica de Prova**: Entender o mecanismo eletroquímico é fundamental. Questões sobre anodo/catodo são frequentes.

**Recomendação:** Revise o módulo sobre Mecanismos de Corrosão no curso teórico.`;
    }

    if (lowerInput.includes('segurança') || lowerInput.includes('nr-33') || lowerInput.includes('nr-35') || lowerInput.includes('sms')) {
      return `**SMS em Pintura Industrial** é crítico para a segurança dos trabalhadores.

**Normas Aplicáveis:**
• **NR-33**: Espaços Confinados
• **NR-35**: Trabalho em Altura
• **NR-12**: Máquinas e Equipamentos

**Riscos Específicos:**
• **Inalação de vapores**: Uso obrigatório de respiradores
• **Contato com produtos**: Luvas e roupas adequadas
• **Trabalho em altura**: Cintos de segurança, andaimes certificados
• **Espaços confinados**: Permissão de entrada, monitoramento de gases

**EPIs Obrigatórios:**
• Capacete de segurança
• Óculos de proteção
• Respirador (máscara adequada ao produto)
• Luvas químicas
• Calçados de segurança
• Roupas de proteção

💡 **Dica de Prova**: Questões sobre EPIs e normas de segurança são sempre presentes. Memorize as NRs principais.

**⚠️ ALERTA**: Nunca entre em espaços confinados sem permissão e monitoramento adequado. Isso é uma violação grave de segurança.`;
    }

    // Resposta padrão
    return `Entendi sua pergunta sobre "${userInput}". 

Como Mentor Inspetor Master, posso ajudá-lo com:

📚 **Normas Técnicas**
• ISO 8501-1 (Preparação de superfície)
• ISO 4624 (Aderência)
• Normas Petrobras (N-13, N-9, N-2)
• Normas ABRACO

🔬 **Instrumentação**
• Termo-higrômetro
• Rugosímetro
• Medidor de espessura (PC-04)
• Holiday Detector
• Testes de aderência

💡 **Dica**: Seja mais específico na sua pergunta. Por exemplo:
• "O que é intemperismo?"
• "Me dê uma questão sobre rugosidade"
• "Explique o ponto de orvalho"

Ou navegue pelos módulos do curso para revisar o conteúdo teórico antes de fazer perguntas mais específicas.`;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px] bg-[#0a0a0a] dark:bg-white rounded-2xl border border-[#1a1a1a] dark:border-slate-200 overflow-hidden transition-colors shadow-lg dark:shadow-md">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 dark:from-[#F5F5F5] dark:to-white border-b border-[#1a1a1a] dark:border-slate-200 p-4 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 dark:from-[#FF6700] dark:to-[#FF8533] rounded-lg flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white dark:text-[#333333] transition-colors">
              Mentor Inspetor Master
            </h2>
            <p className="text-xs text-slate-400 dark:text-[#666666] transition-colors">
              Tutor especializado em Inspeção de Pintura Industrial
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.role === 'mentor' && (
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 dark:from-[#FF6700] dark:to-[#FF8533] rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 dark:from-[#FF6700] dark:to-[#FF8533] text-white shadow-md'
                  : 'bg-[#1a1a1a] dark:bg-[#F5F5F5] text-white dark:text-[#333333] border border-[#1a1a1a] dark:border-slate-200 shadow-sm'
              } transition-colors`}
            >
              <div className="prose prose-invert dark:prose-slate max-w-none">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content.split('\n').map((line, idx) => {
                    // Detectar dicas de prova
                    if (line.includes('💡')) {
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-2 mt-2 p-2 bg-amber-500/10 dark:bg-[#FF6700]/10 rounded border-l-2 border-amber-500 dark:border-[#FF6700]"
                        >
                          <Lightbulb className="w-4 h-4 text-amber-500 dark:text-[#FF6700] flex-shrink-0 mt-0.5" />
                          <span className="text-amber-400 dark:text-[#E65100] text-xs">
                            {line}
                          </span>
                        </div>
                      );
                    }
                    // Detectar alertas de segurança
                    if (line.includes('⚠️') || line.includes('ALERTA')) {
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-2 mt-2 p-2 bg-red-500/10 dark:bg-red-100 rounded border-l-2 border-red-500"
                        >
                          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-red-400 dark:text-red-700 text-xs">
                            {line}
                          </span>
                        </div>
                      );
                    }
                    // Formatação de texto
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <strong
                          key={idx}
                          className="text-amber-400 dark:text-[#FF6700] block mt-2"
                        >
                          {line.replace(/\*\*/g, '')}
                        </strong>
                      );
                    }
                    return <p key={idx}>{line || '\u00A0'}</p>;
                  })}
                </div>
              </div>
            </div>
            {message.role === 'user' && (
              <div className="w-8 h-8 bg-slate-700 dark:bg-[#E0E0E0] rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white dark:text-[#333333]" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 dark:from-[#FF6700] dark:to-[#FF8533] rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-[#1a1a1a] dark:bg-[#F5F5F5] rounded-lg p-4 border border-[#1a1a1a] dark:border-slate-200">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-amber-500 dark:bg-[#FF6700] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-amber-500 dark:bg-[#FF6700] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-amber-500 dark:bg-[#FF6700] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="border-t border-[#1a1a1a] dark:border-slate-200 p-4 transition-colors bg-[#0a0a0a] dark:bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Faça uma pergunta sobre inspeção de pintura..."
            className="flex-1 px-4 py-3 bg-[#1a1a1a] dark:bg-[#F5F5F5] border border-[#1a1a1a] dark:border-slate-300 rounded-lg text-white dark:text-[#333333] placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-[#FF6700] transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-gradient-to-r from-amber-500 to-orange-600 dark:from-[#FF6700] dark:to-[#FF8533] hover:from-amber-600 hover:to-orange-700 text-white p-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-slate-500 dark:text-[#666666] mt-2 text-center">
          Exemplos: "O que é intemperismo?", "Me dê uma questão sobre aderência", "Explique o ponto de orvalho"
        </p>
      </form>
    </div>
  );
};

