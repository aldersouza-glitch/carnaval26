
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

// Relação Nominal Completa baseada na planilha (Categoria OUTROS)
export const OTHERS_OBSERVATIONS: OtherObservation[] = [
  { rank: 'SD', name: 'ALYSSON RHODOLFO DE SOUZA VANDERLEI', category: 'Jurídico', observation: 'PRESO JUDICIAL', opm: 'AJUDANCIA' },
  { rank: '3º SGT', name: 'DANNYLO ROGERS BEZERRA SILVA', category: 'Operacional', observation: 'P2', opm: 'BPA' },
  { rank: '3º SGT', name: 'ELIANE RODRIGUES VIANA CAVALCANTE', category: 'Operacional', observation: 'CAD', opm: 'BPA' },
  { rank: 'MAJ', name: 'FÁBIO OLIVEIRA CHAVES', category: 'Função/Cargo', observation: 'SUB.CMT DA UNIDADE', opm: 'BPA' },
  { rank: '1º TEN', name: 'IGOR IVISSON DE OLIVEIRA PASSOS', category: 'Operacional', observation: 'P2', opm: 'BPA' },
  { rank: 'CB', name: 'LUCAS MENDONÇA LIMA TEIXEIRA', category: 'Operacional', observation: 'P2', opm: 'BPA' },
  { rank: 'CB', name: 'LUIZ EURICO DE VASCONCELOS PEDROSA', category: 'Operacional', observation: 'P2', opm: 'BPA' },
  { rank: 'CB', name: 'RICCARDO RAMOS ACIOLY', category: 'Operacional', observation: 'COPOM', opm: 'BPA' },
  { rank: '3º SGT', name: 'ROGÉRIO SIQUEIRA DE ARAÚJO', category: 'Função/Cargo', observation: 'MOT DO CMT DO BPA', opm: 'BPA' },
  { rank: 'TEN CEL', name: 'SIDRAITON SOARES SANTOS', category: 'Função/Cargo', observation: 'CMT DA UNIDADE', opm: 'BPA' },
  { rank: 'SD', name: 'JACKSON OLIVEIRA SANTOS', category: 'Formação', observation: 'REINTEGRADO EM ESTÁGIO', opm: 'CFAP' },
  { rank: 'CB', name: 'LUCIANO FRANCISCO FELIX DE CARVALHO', category: 'Social/Saúde', observation: 'CURADOR DE DEPENDENTE PCD (PORTARIA N°...)', opm: 'CFAP' },
  { rank: 'SD', name: 'RODRIGO FRANKLIN DA SILVA OLIVEIRA', category: 'Formação', observation: 'REINTEGRADO EM ESTÁGIO', opm: 'CFAP' },
  { rank: '3º Sgt PM', name: 'ALYNE VANESSA FERREIRA LIMA', category: 'Disposição', observation: 'SENASP', opm: 'CIA' },
  { rank: '3º Sgt QPS', name: 'RICARDO TENÓRIO FERRO', category: 'Operacional', observation: 'RPMON', opm: 'CIA' },
  { rank: '2º SGT', name: 'JOSE ADRIANO DA SILVA', category: 'Jurídico', observation: 'À DISPOSIÇÃO DA 13 VARA CRIMINAL DA CAPITAL', opm: 'CORREG' },
  { rank: '2º SGT', name: 'MARIA LUCÉLIA DOS SANTOS PRAXEDES', category: 'Jurídico', observation: 'À DISPOSIÇÃO DA 13 VARA CRIMINAL DA CAPITAL', opm: 'CORREG' },
  { rank: '2º TEN', name: 'REJANE NASCIMENTO DE ASSUNÇÃO BATISTA', category: 'Disposição', observation: 'CORREGEDORIA', opm: 'CORREG' },
  { rank: 'CEL', name: 'MARIO ANTONIO DE OLIVEIRA XAVIER BARROS', category: 'Função/Cargo', observation: 'COMANDANTE', opm: 'CPE' },
  { rank: '3º SGT', name: 'THIAGO MONTEIRO JATOBÁ', category: 'Jurídico', observation: 'PROCESSO SEI N° E:01206.0000005569/2024', opm: 'DEIP' },
  { rank: '2º Sgt', name: 'ALYSSON CESAR PAULINELLI DA SILVA CORREIA', category: 'Função/Cargo', observation: 'MOTORISTA DO COORDENADOR DE LOGÍSTICA', opm: 'DLOG' },
  { rank: 'CB', name: 'MICHELLY DA COSTA GOMES', category: 'Social/Saúde', observation: 'LACTANTE', opm: 'DLOG' },
  { rank: 'Cel', name: 'RENILSON RODRIGUES DANTAS', category: 'Função/Cargo', observation: 'COORDENADOR DE LOGÍSTICA', opm: 'DLOG' },
  { rank: '3º SGT QP', name: 'DIEGO RIDELVAN FERNANDES DOS SANTOS', category: 'Segurança', observation: 'Eq. Seg. Cel Bittencourt', opm: 'DP' },
  { rank: 'CB', name: 'GUSTAVO HENRIQUE DE ALBUQUERQUE PEREIRA', category: 'Função/Cargo', observation: 'MOTORISTA DO DIRETOR', opm: 'DP' },
  { rank: '3º SGT QP', name: 'IGOR MAIA MARANHAO ARAUJO', category: 'Segurança', observation: 'Eq. Seg. Cel Bittencourt', opm: 'DP' },
  { rank: '2º TEN QOA', name: 'LILIANE SANTOS REIS', category: 'Social/Saúde', observation: 'CUIDADORA DA MÃE (E:01206.0000030422/2024)', opm: 'DP' },
  { rank: 'SUB TEN', name: 'MARCOS ANTONIO MONTEIRO DE OLIVEIRA', category: 'Segurança', observation: 'Eq. Seg. Cel Bittencourt', opm: 'DP' },
  { rank: 'SD QP', name: 'YURI SOUZA LINS QUEIROZ', category: 'Jurídico', observation: 'A DISPOSIÇÃO DO MP', opm: 'DP' },
  { rank: '1º Sgt', name: 'JOSE AUGUSTO DE MELO GOMES', category: 'Função/Cargo', observation: 'MOTORISTA AMBULÂNCIA', opm: 'DS' },
  { rank: '2º Sgt', name: 'JOSINALDO DOS SANTOS SILVA', category: 'Função/Cargo', observation: 'MOTORISTA AMBULÂNCIA', opm: 'DS' },
  { rank: 'CEL', name: 'MACIEL PANTALEÃO SILVA', category: 'Função/Cargo', observation: 'CHEFE DO EMG', opm: 'EMG' },
  { rank: 'TEN CEL', name: 'SÉRGIO HENRIQUE LIMA DOS SANTOS', category: 'Função/Cargo', observation: 'SUBCHEFE DO EMG', opm: 'EMG' },
  { rank: 'CB', name: 'LEONARDO COSTA MELO (CEDIDO)', category: 'Disposição', observation: 'CEDIDO À SSP', opm: 'PMP' },
  { rank: 'CB', name: 'LUANA SILVA NERIS', category: 'Social/Saúde', observation: 'AMAMENTAÇÃO', opm: 'PROERD' },
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
