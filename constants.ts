
import { GlobalStats, OPMSData, RankData, UnavailabilityReason, CommandRankData, OtherObservation } from './types';

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

export const OPMS_DATA: OPMSData[] = [
  { name: 'AJUDANCIA', available: 23, unavailable: 15, total: 38 },
  { name: 'APM', available: 83, unavailable: 44, total: 127 },
  { name: 'BPA', available: 53, unavailable: 62, total: 115 },
  { name: 'CENTRO MUSICAL', available: 102, unavailable: 6, total: 108 },
  { name: 'CFAP', available: 40, unavailable: 30, total: 70 },
  { name: 'CGCDHPC', available: 14, unavailable: 18, total: 32 },
  { name: 'CIA', available: 14, unavailable: 28, total: 42 },
  { name: 'COPEME', available: 0, unavailable: 2, total: 2 },
  { name: 'CORREG', available: 0, unavailable: 44, total: 44 },
  { name: 'CPE', available: 9, unavailable: 2, total: 11 },
  { name: 'CPMC', available: 33, unavailable: 12, total: 45 },
  { name: 'CPMI', available: 22, unavailable: 9, total: 31 },
  { name: 'DCS', available: 0, unavailable: 24, total: 24 },
  { name: 'DEFD', available: 18, unavailable: 3, total: 21 },
  { name: 'DEIP', available: 10, unavailable: 2, total: 12 },
  { name: 'DF', available: 26, unavailable: 5, total: 31 },
  { name: 'DLOG', available: 70, unavailable: 40, total: 110 },
  { name: 'DP', available: 36, unavailable: 14, total: 50 },
  { name: 'DPP', available: 0, unavailable: 9, total: 9 },
  { name: 'DPS', available: 54, unavailable: 14, total: 68 },
  { name: 'DS', available: 25, unavailable: 85, total: 110 },
  { name: 'EMG', available: 4, unavailable: 2, total: 6 },
  { name: 'OUVIDORIA', available: 5, unavailable: 3, total: 8 },
  { name: 'PM1', available: 5, unavailable: 2, total: 7 },
  { name: 'PM2', available: 0, unavailable: 10, total: 10 },
  { name: 'PM3', available: 9, unavailable: 0, total: 9 },
  { name: 'PM4', available: 5, unavailable: 5, total: 10 },
  { name: 'PM5', available: 11, unavailable: 17, total: 28 },
  { name: 'PMP', available: 6, unavailable: 16, total: 22 },
  { name: 'PROERD', available: 0, unavailable: 16, total: 16 },
  { name: 'SPO', available: 5, unavailable: 0, total: 5 },
  { name: 'SPP', available: 5, unavailable: 0, total: 5 },
];

export const RANK_DATA: RankData[] = [
  { rank: 'OFICIAIS', available: 136, special: 0, unavailable: 120, total: 256 },
  { rank: 'PRAÇAS', available: 542, special: 18, unavailable: 428, total: 988 },
];

export const UNAVAILABLE_REASONS: UnavailabilityReason[] = [
  { reason: 'ESCALA INTERNA', count: 339 },
  { reason: 'À DISP. DE OPM ADM', count: 70 },
  { reason: 'GUARDA', count: 37 },
  { reason: 'OUTROS', count: 35 },
  { reason: 'À DISP. DE OPM OPERACIONAL', count: 16 },
  { reason: 'APTO COM RESTRIÇÃO', count: 15 },
  { reason: 'DISPENSA MÉDICA', count: 8 },
  { reason: 'GESTANTE', count: 7 },
  { reason: 'À DISP. AUTORIDADE', count: 6 },
  { reason: 'RESTRIÇÃO PORTE', count: 6 },
];

// Dados detalhados de 'OUTROS' baseados na planilha enviada
export const OTHERS_OBSERVATIONS: OtherObservation[] = [
  { category: 'Jurídico', observation: 'PRESO JUDICIAL', opm: 'AJUDANCIA', count: 1 },
  { category: 'Inteligência/Operacional', observation: 'P2', opm: 'BPA', count: 4 },
  { category: 'Operacional', observation: 'CAD', opm: 'BPA', count: 1 },
  { category: 'Função/Cargo', observation: 'SUB.CMT DA UNIDADE', opm: 'BPA', count: 1 },
  { category: 'Afastamento', observation: 'P2/FÉRIAS', opm: 'BPA', count: 1 },
  { category: 'Operacional', observation: 'COPOM', opm: 'BPA', count: 1 },
  { category: 'Função/Cargo', observation: 'MOT DO CMT DO BPA', opm: 'BPA', count: 1 },
  { category: 'Função/Cargo', observation: 'CMT DA UNIDADE', opm: 'BPA', count: 1 },
  { category: 'Formação', observation: 'REINTEGRADO EM ESTÁGIO', opm: 'CFAP', count: 2 },
  { category: 'Social/Saúde', observation: 'CURADOR DE DEPENDENTE PCD', opm: 'CFAP', count: 1 },
  { category: 'Disposição', observation: 'SENASP', opm: 'CIA', count: 1 },
  { category: 'Unidade Especial', observation: 'RPMON', opm: 'CIA', count: 1 },
  { category: 'Disposição', observation: 'À DISPOSIÇÃO DA 13 VARA CRIMINAL', opm: 'CORREG', count: 2 },
  { category: 'Unidade Especial', observation: 'CORREGEDORIA', opm: 'CORREG', count: 1 },
  { category: 'Função/Cargo', observation: 'COMANDANTE', opm: 'CPE', count: 1 },
  { category: 'Jurídico', observation: 'PROCESSO SEI N°...', opm: 'DEIP', count: 1 },
  { category: 'Função/Cargo', observation: 'MOTORISTA DO COORD. LOGÍSTICA', opm: 'DLOG', count: 1 },
  { category: 'Social/Saúde', observation: 'LACTANTE', opm: 'DLOG', count: 1 },
  { category: 'Função/Cargo', observation: 'COORDENADOR DE LOGÍSTICA', opm: 'DLOG', count: 1 },
  { category: 'Segurança', observation: 'Eq. Seg. Cel Bittencourt', opm: 'DP', count: 3 },
  { category: 'Função/Cargo', observation: 'MOTORISTA DO DIRETOR', opm: 'DP', count: 1 },
  { category: 'Social/Saúde', observation: 'CUIDADORA DA MÃE', opm: 'DP', count: 1 },
  { category: 'Disposição', observation: 'À DISPOSIÇÃO DO MP', opm: 'DP', count: 1 },
  { category: 'Função/Cargo', observation: 'MOTORISTA AMBULÂNCIA', opm: 'DS', count: 2 },
  { category: 'Função/Cargo', observation: 'CHEFE DO EMG', opm: 'EMG', count: 1 },
  { category: 'Função/Cargo', observation: 'SUBCHEFE DO EMG', opm: 'EMG', count: 1 },
  { category: 'Disposição', observation: 'CEDIDO À SSP', opm: 'PMP', count: 1 },
  { category: 'Social/Saúde', observation: 'AMAMENTAÇÃO', opm: 'PROERD', count: 1 },
];

export const GLOBAL_STATS: GlobalStats = {
  available: 687,
  availableSpecial: 18,
  unavailable: 539,
  total: 1244
};

export const COMMAND_RANK_DATA: CommandRankData[] = [
  { command: 'CPMC', ST: 2, SGT1: 8, SGT2: 20, SGT3: 40, CB: 80, SD: 150, total: 300 },
  { command: 'CPMI', ST: 3, SGT1: 7, SGT2: 15, SGT3: 35, CB: 70, SD: 120, total: 250 },
  { command: 'CPE', ST: 1, SGT1: 4, SGT2: 10, SGT3: 15, CB: 40, SD: 80, total: 150 },
  { command: 'CPC', ST: 2, SGT1: 6, SGT2: 12, SGT3: 25, CB: 55, SD: 100, total: 200 },
  { command: 'CPR', ST: 1, SGT1: 3, SGT2: 5, SGT3: 10, CB: 24, SD: 45, total: 88 },
];
