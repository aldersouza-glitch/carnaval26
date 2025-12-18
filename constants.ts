
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

// Dados reais da planilha (Escala Interna)
export const ESCALA_INTERNA_REAL_DISTRIBUTION: Record<string, number> = {
  'AJUDANCIA': 2,
  'APM': 30,
  'BPA': 31,
  'CFAP': 20,
  'CGCDHPC': 17,
  'CIA': 20,
  'COPEME': 2,
  'CORREG': 31,
  'CPE': 1,
  'CPMC': 4,
  'DCS': 22,
  'DLOG': 30,
  'DPP': 6,
  'DPS': 1,
  'DS': 72,
  'PM2': 9,
  'PM5': 12,
  'PMP': 15,
  'PROERD': 14
};

export const OPMS_DATA: OPMSData[] = [
  { name: 'AJUDANCIA', available: 23, special: 3, unavailable: 15, total: 41 },
  { name: 'APM', available: 83, special: 0, unavailable: 44, total: 127 },
  { name: 'BPA', available: 53, special: 2, unavailable: 59, total: 114 },
  { name: 'CENTRO MUSICAL', available: 102, special: 2, unavailable: 6, total: 110 },
  { name: 'CFAP', available: 40, special: 0, unavailable: 30, total: 70 },
  { name: 'CGCDHPC', available: 14, special: 0, unavailable: 18, total: 32 },
  { name: 'CIA', available: 14, special: 0, unavailable: 28, total: 42 },
  { name: 'COPEME', available: 0, special: 0, unavailable: 2, total: 2 },
  { name: 'CORREG', available: 0, special: 0, unavailable: 44, total: 44 },
  { name: 'CPE', available: 0, special: 0, unavailable: 11, total: 11 },
  { name: 'CPMC', available: 33, special: 0, unavailable: 12, total: 45 },
  { name: 'CPMI', available: 22, special: 0, unavailable: 7, total: 29 },
  { name: 'DCS', available: 0, special: 0, unavailable: 24, total: 24 },
  { name: 'DEFD', available: 18, special: 0, unavailable: 3, total: 21 },
  { name: 'DEIP', available: 10, special: 0, unavailable: 1, total: 11 },
  { name: 'DF', available: 26, special: 1, unavailable: 5, total: 32 },
  { name: 'DLOG', available: 70, special: 2, unavailable: 40, total: 112 },
  { name: 'DP', available: 36, special: 0, unavailable: 14, total: 50 },
  { name: 'DPP', available: 0, special: 0, unavailable: 9, total: 9 },
  { name: 'DPS', available: 54, special: 5, unavailable: 14, total: 73 },
  { name: 'DS', available: 25, special: 0, unavailable: 85, total: 110 },
  { name: 'EMG', available: 4, special: 0, unavailable: 2, total: 6 },
  { name: 'OUVIDORIA', available: 5, special: 0, unavailable: 3, total: 8 },
  { name: 'PM1', available: 5, special: 0, unavailable: 2, total: 7 },
  { name: 'PM2', available: 0, special: 0, unavailable: 10, total: 10 },
  { name: 'PM3', available: 9, special: 1, unavailable: 0, total: 10 },
  { name: 'PM4', available: 5, special: 0, unavailable: 5, total: 10 },
  { name: 'PM5', available: 11, special: 0, unavailable: 16, total: 27 },
  { name: 'PMP', available: 6, special: 2, unavailable: 16, total: 24 },
  { name: 'PROERD', available: 0, special: 0, unavailable: 16, total: 16 },
];

export const RANK_DATA: RankData[] = [
  { rank: 'OFICIAIS', available: 134, special: 0, unavailable: 119, total: 253 },
  { rank: 'PRAÇAS', available: 534, special: 18, unavailable: 422, total: 974 },
];

export const UNAVAILABLE_REASONS: UnavailabilityReason[] = [
  { reason: 'ESCALA INTERNA', count: 339 },
  { reason: 'À DISP. DE OPM ADM', count: 70 },
  { reason: 'GUARDA', count: 37 },
  { reason: 'OUTROS', count: 36 },
  { reason: 'À DISP. OPM OPER', count: 17 },
  { reason: 'APTO COM RESTRIÇÃO', count: 15 },
  { reason: 'DISPENSA MÉDICA', count: 8 },
  { reason: 'GESTANTE', count: 7 },
  { reason: 'À DISP. AUTORIDADE', count: 6 },
  { reason: 'RESTRIÇÃO PORTE', count: 6 },
];

export const GLOBAL_STATS: GlobalStats = {
  available: 668,
  availableSpecial: 18,
  unavailable: 541,
  total: 1227
};

export const DETAILED_PERSONNEL: PersonnelRecord[] = [
  { rank: 'MAJ', name: 'FÁBIO OLIVEIRA CHAVES', reason: 'OUTROS', observation: 'SUB.CMT DA UNIDADE', opm: 'BPA', category: 'Função/Cargo' },
  { rank: 'TEN CEL', name: 'SIDRAITON SOARES SANTOS', reason: 'OUTROS', observation: 'CMT DA UNIDADE', opm: 'BPA', category: 'Função/Cargo' },
  { rank: '1º TEN', name: 'IGOR IVISSON DE OLIVEIRA PASSOS', reason: 'OUTROS', observation: 'P2', opm: 'BPA', category: 'Função/Cargo' },
  { rank: 'CB', name: 'LUIZ EURICO DE VASCONCELOS PEDROSA', reason: 'OUTROS', observation: 'P2', opm: 'BPA', category: 'Função/Cargo' },
  { rank: 'CB', name: 'LUCAS MENDONÇA LIMA TEIXEIRA', reason: 'OUTROS', observation: 'P2', opm: 'BPA', category: 'Função/Cargo' },
  { rank: '3º SGT', name: 'DANNYLLO ROGERS BEZERRA SILVA', reason: 'OUTROS', observation: 'P2', opm: 'BPA', category: 'Função/Cargo' },
  { rank: '3º SGT', name: 'ELIANE RODRIGUES VIANA CAVALCANTE', reason: 'OUTROS', observation: 'CAD', opm: 'BPA', category: 'Função/Cargo' },
  { rank: '3º SGT', name: 'ROGÉRIO SIQUEIRA DE ARAÚJO', reason: 'OUTROS', observation: 'MOT DO CMT DO BPA', opm: 'BPA', category: 'Função/Cargo' },
  { rank: 'SD', name: 'ALEXANDRE MAGNO DA FONSECA BARBOZA', reason: 'OUTROS', observation: 'ESCOLTA', opm: 'BPA', category: 'Função/Cargo' },
  { rank: 'CB', name: 'ANTONYO MOREIRA', reason: 'À DISP. AUTORIDADE', observation: 'Disposição', opm: 'BPA' },
  { rank: '2º SGT', name: 'BERNADETE BARROS DO NASCIMENTO', reason: 'À DISP. AUTORIDADE', observation: 'Disposição', opm: 'BPA' },
  { rank: '2º SGT', name: 'DIEGO FABRICIO SOUZA DE PAULA', reason: 'À DISP. AUTORIDADE', observation: 'Disposição', opm: 'BPA' },
  { rank: '3º SGT', name: 'MARCIA CECÍLIA DE OLIVEIRA', reason: 'À DISP. AUTORIDADE', observation: 'Disposição', opm: 'BPA' },
  { rank: '2º SGT', name: 'RICHELMY ROMAO VENTURA DA SILVA', reason: 'À DISP. AUTORIDADE', observation: 'Disposição', opm: 'BPA' },
  { rank: '2º SGT', name: 'ANTONIO DE PADUA COSTA DOS SANTOS', reason: 'À DISP. DE OPM ADM', observation: 'DEIP', opm: 'BPA' },
  { rank: 'SD', name: 'ALYSSON RHODOLFO DE SOUZA VANDERLEI', reason: 'OUTROS', observation: 'PRESO JUDICIAL', opm: 'AJUDANCIA', category: 'Jurídico' },
  { rank: 'CB', name: 'FABIO HENRIQUE ALMEIDA', reason: 'OUTROS', observation: 'JUSTIÇA MILITAR', opm: 'AJUDANCIA', category: 'Jurídico' },
  { rank: 'SD', name: 'JACKSON OLIVEIRA SANTOS', reason: 'OUTROS', observation: 'REINTEGRADO EM ESTÁGIO', opm: 'CFAP', category: 'Jurídico' },
  { rank: 'SD', name: 'RODRIGO FRANKLIN DA SILVA OLIVEIRA', reason: 'OUTROS', observation: 'REINTEGRADO EM ESTÁGIO', opm: 'CFAP', category: 'Jurídico' },
  { rank: 'CB', name: 'LUCIANO FRANCISCO FELIX DE CARVALHO', reason: 'OUTROS', observation: 'CURADOR DE PCD', opm: 'CFAP', category: 'Social/Saúde' },
  { rank: '3º Sgt PM', name: 'ALYNE VANESSA FERREIRA LIMA', reason: 'OUTROS', observation: 'SENASP', opm: 'CIA', category: 'Cedido' },
  { rank: '2º SGT', name: 'JOSE ADRIANO DA SILVA', reason: 'OUTROS', observation: 'VARA CRIMINAL', opm: 'CORREG', category: 'Jurídico' },
  { rank: '2º SGT', name: 'MARIA LUCÉLIA DOS SANTOS PRAXEDES', reason: 'OUTROS', observation: 'VARA CRIMINAL', opm: 'CORREG', category: 'Jurídico' },
  { rank: 'CB', name: 'MICHELLY DA COSTA GOMES', reason: 'OUTROS', observation: 'LACTANTE', opm: 'DLOG', category: 'Social/Saúde' },
  { rank: '2º TEN QOA', name: 'LILIANE SANTOS REIS', reason: 'OUTROS', observation: 'CUIDADORA DA MÃE', opm: 'DP', category: 'Social/Saúde' },
  { rank: 'SD QP', name: 'YURI SOUZA LINS QUEIROZ', reason: 'OUTROS', observation: 'A DISPOSIÇÃO DO MP', opm: 'DP', category: 'Jurídico' },
  { rank: 'CB', name: 'LUANA SILVA NERIS', reason: 'OUTROS', observation: 'AMAMENTAÇÃO', opm: 'PROERD', category: 'Social/Saúde' },
];

export const OTHERS_OBSERVATIONS = DETAILED_PERSONNEL.filter(p => p.reason === 'OUTROS');

export const COMMAND_RANK_DATA: CommandRankData[] = [
  { command: 'CPMC', ST: 2, SGT1: 8, SGT2: 20, SGT3: 40, CB: 80, SD: 150, total: 300 },
  { command: 'CPMI', ST: 3, SGT1: 7, SGT2: 15, SGT3: 35, CB: 70, SD: 120, total: 250 },
  { command: 'CPE', ST: 1, SGT1: 4, SGT2: 10, SGT3: 15, CB: 40, SD: 80, total: 150 },
  { command: 'CPC', ST: 2, SGT1: 6, SGT2: 12, SGT3: 25, CB: 55, SD: 100, total: 200 },
  { command: 'CPR', ST: 1, SGT1: 3, SGT2: 5, SGT3: 10, CB: 24, SD: 45, total: 88 },
];
