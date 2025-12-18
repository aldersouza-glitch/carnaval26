
export interface OPMSData {
  name: string;
  available: number;
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

// Interface para detalhar nominalmente os itens dentro da categoria 'OUTROS'
export interface OtherObservation {
  rank: string;
  name: string;
  category: string;
  observation: string;
  opm: string;
}
