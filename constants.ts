import { CaseStudy, NormSummary, PaintSystem } from './types';

export const NORMS: NormSummary[] = [
  {
    code: 'N-13',
    title: 'Requisitos Técnicos para Serviços de Pintura',
    points: [
      'Umidade Relativa (UR): Máximo 85%.',
      'Temperatura da Superfície: Mínimo 3°C acima do Ponto de Orvalho.',
      'Critérios de Aceitação: Medição de espessura regra 80/20.',
      'Segurança: EPIs obrigatórios para inspetores.'
    ]
  },
  {
    code: 'N-9',
    title: 'Tratamento de Superfície',
    points: [
      'Graus de Intemperismo: A (intacto), B (início oxidação), C (pite leve), D (pite severo).',
      'Padrões de Jateamento: Sa 1, Sa 2, Sa 2 1/2 (Metal Quase Branco), Sa 3 (Metal Branco).',
      'Hidrojateamento (WJ): WJ-1 a WJ-4 (Norma NACE/SSPC também aplicável).'
    ]
  },
  {
    code: 'N-2',
    title: 'Pintura de Equipamentos Industriais',
    points: [
      'Condição 1: Atmosfera rural ou urbana leve.',
      'Condição 2: Atmosfera industrial leve.',
      'Condição 3: Atmosfera industrial agressiva / Marinha.',
      'Seleção de Esquema baseada em temperatura de operação e material base.'
    ]
  }
];

export const PAINTS: PaintSystem[] = [
  {
    code: 'N-2680',
    name: 'Tinta Epóxi Poliamida',
    description: 'Tinta de fundo e acabamento de alta espessura, tolerante a superfície.',
    application: 'Tanques, estruturas, tubulações até 120°C.'
  },
  {
    code: 'N-1661',
    name: 'Silicato de Zinco (Inorgânico)',
    description: 'Proteção catódica (galvânica). Exige jateamento Sa 2 1/2 ou Sa 3.',
    application: 'Superfícies expostas a alta corrosividade ou temperatura até 400°C.'
  },
  {
    code: 'N-2677',
    name: 'Poliuretano Acrílico',
    description: 'Tinta de acabamento com alta resistência a raios UV (brilho e cor).',
    application: 'Acabamento estético para áreas externas.'
  }
];

export const CASES: CaseStudy[] = [
  {
    id: 'case-27',
    title: 'Cenário A: Tanque de Nafta (Ex. 27)',
    description: 'Inspeção final de revestimento interno de tanque de armazenamento.',
    context: 'Você está inspecionando o fundo de um tanque de Nafta recém-pintado. A documentação indica o uso de Epóxi Novolac. Durante a verificação dos documentos, você nota que não foi preparado nenhum corpo de prova (painel de teste) para o lote aplicado.',
    question: 'Como você deve proceder no preenchimento do RIPI/RNC?',
    options: [
      {
        id: 'opt1',
        text: 'Aprovar a pintura visualmente se a espessura estiver correta.',
        isCorrect: false,
        feedback: 'Erro Grave! Sem corpo de prova, não há rastreabilidade dos testes destrutivos de referência.'
      },
      {
        id: 'opt2',
        text: 'Emitir RNC por falta de evidência de qualificação do processo (Corpo de Prova ausente).',
        isCorrect: true,
        feedback: 'Correto! Conforme a norma, a ausência de corpo de prova impede a validação dos ensaios destrutivos e a liberação do lote.'
      },
      {
        id: 'opt3',
        text: 'Solicitar apenas um teste de aderência no tanque.',
        isCorrect: false,
        feedback: 'Incorreto. Testes destrutivos no equipamento devem ser evitados a menos que estritamente necessários e previstos.'
      }
    ]
  },
  {
    id: 'case-28',
    title: 'Cenário B: Ponte Rolante (Ex. 28)',
    description: 'Inspeção de manutenção em Ponte Rolante na Orla Marítima.',
    context: 'Uma ponte rolante em zona de respingos de maré (Zone Splash). O esquema pede 250 micrometros. O inspetor anterior aprovou com 83 micrometros média. Teste de aderência (Pull-off) deu 21 MPa com falha 100% coesiva na tinta (A/B).',
    question: 'Qual a análise técnica correta?',
    options: [
      {
        id: 'opt1',
        text: 'Aprovado. A aderência está acima de 20 MPa.',
        isCorrect: false,
        feedback: 'Incorreto. Embora a aderência seja boa, a espessura (83um) é insuficiente para zona marinha (pede 250um).'
      },
      {
        id: 'opt2',
        text: 'Reprovado por baixa espessura, apesar da boa aderência.',
        isCorrect: true,
        feedback: 'Exato. O esquema para orla marítima exige alta espessura por barreira. 83um é insuficiente, gerando RNC.'
      },
      {
        id: 'opt3',
        text: 'Reprovado por falha de aderência.',
        isCorrect: false,
        feedback: 'Incorreto. 21 MPa é um valor excelente. O problema é a espessura.'
      }
    ]
  },
  {
    id: 'case-18',
    title: 'Cenário C: Tubulação (Ex. 18)',
    description: 'Manutenção em linha que não pode sofrer "Steam Out".',
    context: 'Uma tubulação antiga apresenta corrosão. O processo operacional impede limpeza com vapor (Steam Out) para remoção de sais/óleos antes do jateamento. O operador quer jatear direto sobre a graxa.',
    question: 'Qual a conduta ética e técnica?',
    options: [
      {
        id: 'opt1',
        text: 'Permitir jateamento direto para ganhar tempo.',
        isCorrect: false,
        feedback: 'Proibido! Jatear sobre óleo contamina o abrasivo e impregna o contaminante no metal.'
      },
      {
        id: 'opt2',
        text: 'Interromper o serviço. Exigir limpeza com solvente/desengraxante (N-9) antes do jateamento.',
        isCorrect: true,
        feedback: 'Correto. A N-9 exige remoção de contaminantes visíveis (óleo/graxa) antes da preparação mecânica.'
      }
    ]
  }
];