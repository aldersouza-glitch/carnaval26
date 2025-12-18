
export interface OPMSData {
  name: string;
  available: number;
  special: number;
  unavailable: number;
  total: number;
}

export interface RankData {
  rank: string;
  available: number;
  special: number;
  unavailable: number;
  total: number;
}

export interface UnavailabilityReason {
  reason: string;
  count: number;
}

export interface GlobalStats {
  available: number;
  availableSpecial: number;
  unavailable: number;
  total: number;
}

export interface CommandRankData {
  command: string;
  ST: number;
  SGT1: number;
  SGT2: number;
  SGT3: number;
  CB: number;
  SD: number;
  total: number;
}

// Interface genérica para registros nominais de militares indisponíveis
export interface PersonnelRecord {
  rank: string;
  name: string;
  reason: string;
  observation: string;
  opm: string;
  category?: string;
}

// Mantendo para compatibilidade com código existente que usa o nome antigo
export type OtherObservation = PersonnelRecord;
