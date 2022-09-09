export interface CalculateCuesCountByPart {
  cuesCount: number;
  totalPartsToSplit: number;
}

export interface Parts {
  from: number;
  to: number;
}

export interface BuildParts {
  totalCuesByPart: number[];
}
