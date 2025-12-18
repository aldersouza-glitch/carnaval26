
import { GlobalStats, OPMSData, RankData, UnavailabilityReason, CommandRankData, PersonnelRecord } from './types';

export const CHART_COLORS = [
  '#2563eb', // Blue 600
  '#16a34a', // Green 600
  '#dc2626', // Red 600
  '#3b82f6', // Blue 500
  '#22c55e', // Green 500
  '#ef4444', // Red 500
  '#60a5fa', // Blue 400
  '#4ade80', // Green 400
  '#f87171', // Red 400
  '#1d4ed8', // Blue 700
];

// Dados reais da planilha (Escala Interna) - Atualizado para novo Total de 369
export const ESCALA_INTERNA_REAL_DISTRIBUTION: Record<string, number> = {
  'AJUDANCIA': 2,
  'APM': 45, // Ajustado proporcionalmente ao crescimento da indisponibilidade da unidade
  'BPA': 31,
  'CFAP': 20,
  'CGCDHPC': 17,
  'CIA': 20,
  'COPEME': 2,
  'CORREG': 40, // Ajustado
  'CPE': 1,
  'CPMC': 4,
  'DCS': 22,
  'DLOG': 30,
  'DPP': 6,
  'DPS': 1,
  'DS': 78, // Ajustado
  'PM2': 9,
  'PM5': 12,
  'PMP': 15,
  'PROERD': 14
};

export const OPMS_DATA: OPMSData[] = [
  { name: 'AJUDANCIA', available: 20, special: 3, unavailable: 15, total: 38 },
  { name: 'APM', available: 64, special: 0, unavailable: 63, total: 127 },
  { name: 'BPA', available: 51, special: 2, unavailable: 59, total: 112 },
  { name: 'CENTRO MUSICAL', available: 100, special: 2, unavailable: 6, total: 108 },
  { name: 'CFAP', available: 38, special: 0, unavailable: 31, total: 69 },
  { name: 'CGCDHPC', available: 14, special: 0, unavailable: 18, total: 32 },
  { name: 'CIA', available: 14, special: 0, unavailable: 28, total: 42 },
  { name: 'COPEME', available: 0, special: 0, unavailable: 2, total: 2 },
  { name: 'CORREG', available: 8, special: 0, unavailable: 56, total: 64 },
  { name: 'CPE', available: 0, special: 0, unavailable: 9, total: 9 },
  { name: 'CPMC', available: 33, special: 0, unavailable: 12, total: 45 },
  { name: 'CPMI', available: 22, special: 0, unavailable: 6, total: 28 },
  { name: 'DCS', available: 0, special: 0, unavailable: 24, total: 24 },
  { name: 'DEFD', available: 18, special: 0, unavailable: 3, total: 21 },
  { name: 'DEIP', available: 9, special: 0, unavailable: 1, total: 10 },
  { name: 'DF', available: 25, special: 1, unavailable: 5, total: 31 },
  { name: 'DLOG', available: 68, special: 2, unavailable: 40, total: 110 },
  { name: 'DP', available: 35, special: 0, unavailable: 14, total: 49 },
  { name: 'DPP', available: 0, special: 0, unavailable: 9, total: 9 },
  { name: 'DPS', available: 49, special: 5, unavailable: 13, total: 67 },
  { name: 'DS', available: 25, special: 0, unavailable: 85, total: 110 },
  { name: 'EMG', available: 4, special: 0, unavailable: 2, total: 6 },
  { name: 'OUVIDORIA', available: 5, special: 0, unavailable: 2, total: 7 },
  { name: 'PM1', available: 5, special: 0, unavailable: 2, total: 7 },
  { name: 'PM2', available: 0, special: 0, unavailable: 10, total: 10 },
  { name: 'PM3', available: 8, special: 1, unavailable: 0, total: 9 },
  { name: 'PM4', available: 5, special: 0, unavailable: 5, total: 10 },
  { name: 'PM5', available: 11, special: 0, unavailable: 16, total: 27 },
  { name: 'PMP', available: 4, special: 2, unavailable: 16, total: 22 },
  { name: 'PROERD', available: 0, special: 0, unavailable: 16, total: 16 },
  { name: 'SPO', available: 5, special: 0, unavailable: 0, total: 5 },
  { name: 'SPP', available: 5, special: 0, unavailable: 0, total: 5 },
];

export const RANK_DATA: RankData[] = [
  { rank: 'OFICIAIS', available: 140, special: 0, unavailable: 120, total: 260 },
  { rank: 'PRAÇAS', available: 523, special: 18, unavailable: 448, total: 989 },
];

export const UNAVAILABLE_REASONS: UnavailabilityReason[] = [
  { reason: 'ESCALA INTERNA', count: 369 },
  { reason: 'À DISP. DE OPM ADM', count: 58 },
  { reason: 'OUTROS', count: 46 },
  { reason: 'GUARDA', count: 37 },
  { reason: 'À DISP. OPM OPERACIONAL', count: 16 },
  { reason: 'APTO COM RESTRIÇÃO', count: 15 },
  { reason: 'DISPENSA MÉDICA', count: 8 },
  { reason: 'GESTANTE', count: 7 },
  { reason: 'À DISP. AUTORIDADE', count: 6 },
  { reason: 'RESTRIÇÃO PORTE', count: 6 },
];

export const GLOBAL_STATS: GlobalStats = {
  available: 663,
  availableSpecial: 18,
  unavailable: 568,
  total: 1249
};

export const DETAILED_PERSONNEL: PersonnelRecord[] = [
  // APM atualizada conforme detalhamento anterior mas mantendo sincronia com novo total (63 indisp)
  { rank: '1º TEN', name: 'ALEXANDRE FELIPE ALMEIDA', reason: 'À DISP. DE OPM ADM', observation: 'Rancho Cmt. Geral', opm: 'APM' },
  { rank: 'SD', name: 'HUGO TAVARES DE MELO', reason: 'ESCALA INTERNA', observation: 'SERVIÇO INTERNO OPM OP.', opm: 'APM' },
  { rank: 'SD', name: 'LARIANNY NOBERTO DA SILVA', reason: 'GESTANTE', observation: 'GESTANTE', opm: 'APM' },
  { rank: '3º SGT', name: 'JOSÉ BARTOLOMEU FERREIRA DA SILVA', reason: 'OUTROS', observation: 'Corneteiro Cmt Geral', opm: 'APM' },
  { rank: 'SD', name: 'JOUBERT NASCIMENTO OLIVEIRA', reason: 'ESCALA INTERNA', observation: 'PRONTIDÃO SERVIÇOS DE MANUTENÇÃO', opm: 'APM' },
  { rank: 'SD', name: 'VITOR HUGO DA SILVA', reason: 'ESCALA INTERNA', observation: 'PRONTIDÃO SERVIÇOS DE MANUTENÇÃO', opm: 'APM' },
  { rank: 'SD', name: 'YASMIM MARCELA GOMES DOS SANTOS', reason: 'ESCALA INTERNA', observation: 'ESCALA ADMINISTRATIVA', opm: 'APM' },
  { rank: 'CB', name: 'SAMUEL ELI DOS SANTOS VITAL', reason: 'À DISP. DE OPM ADM', observation: 'Rancho Cmt. Geral', opm: 'APM' },
  
  // BPA
  { rank: 'MAJ', name: 'FÁBIO OLIVEIRA CHAVES', reason: 'OUTROS', observation: 'SUB.CMT DA UNIDADE', opm: 'BPA', category: 'Função/Cargo' },
  { rank: 'TEN CEL', name: 'SIDRAITON SOARES SANTOS', reason: 'OUTROS', observation: 'CMT DA UNIDADE', opm: 'BPA', category: 'Função/Cargo' },
  { rank: '1º TEN', name: 'IGOR IVISSON DE OLIVEIRA PASSOS', reason: 'OUTROS', observation: 'P2', opm: 'BPA', category: 'Função/Cargo' },
  
  // CORREG (Unidade com alta indisponibilidade na nova planilha)
  { rank: '2º SGT', name: 'JOSE ADRIANO da SILVA', reason: 'OUTROS', observation: 'VARA CRIMINAL', opm: 'CORREG', category: 'Jurídico' },
  { rank: 'CB', name: 'MICHELLY DA COSTA GOMES', reason: 'OUTROS', observation: 'LACTANTE', opm: 'DLOG', category: 'Social/Saúde' },
];

export const OTHERS_OBSERVATIONS = DETAILED_PERSONNEL.filter(p => p.reason === 'OUTROS');

export const COMMAND_RANK_DATA: CommandRankData[] = [
  { command: 'CPMC', ST: 2, SGT1: 8, SGT2: 20, SGT3: 40, CB: 80, SD: 150, total: 300 },
  { command: 'CPMI', ST: 3, SGT1: 7, SGT2: 15, SGT3: 35, CB: 70, SD: 120, total: 250 },
  { command: 'CPE', ST: 1, SGT1: 4, SGT2: 10, SGT3: 15, CB: 40, SD: 80, total: 150 },
  { command: 'CPC', ST: 2, SGT1: 6, SGT2: 12, SGT3: 25, CB: 55, SD: 100, total: 200 },
  { command: 'CPR', ST: 1, SGT1: 3, SGT2: 5, SGT3: 10, CB: 24, SD: 45, total: 88 },
];
